'use strict';
const bodyparser = require('body-parser');
const express = require('express');
const config = require('./config');
const FBeamer = require('./fbeamer');
var spotifyApi = require('./music/index').spotifyApi;
var scopes = require('./music/index').scopes;
const matcher = require('./matcher');
const server = express();
const PORT = process.env.PORT || 3000;
const FB = new FBeamer(config.FB);

/* Spotify Function API GESTION */
function getMyData() {
    (async() => {
        const me = await spotifyApi.getMe();
        // console.log(me.body);
        return (me.body.id);
    })().catch(e => {
        console.error(e);
    });
}


server.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});
server.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);

            console.log(
                `Sucessfully retreived access token. Expires in ${expires_in} s.`
            );
            res.send('Success! You can now close the window.');

            setInterval(async() => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];

                console.log('The access token has been refreshed!');
                console.log('access_token:', access_token);
                spotifyApi.setAccessToken(access_token);
            }, expires_in / 2 * 1000);
        })
        .catch(error => {
            console.error('Error getting Tokens:', error);
            res.send(`Error getting Tokens: ${error}`);
        });
});
server.get('/', (request, response) => FB.registerHook(request, response));
server.listen(PORT, () => console.log(`FBeamer Bot Service running on Port ${PORT}`));
server.post('/', bodyparser.json({ verify: FB.verifySignature.call(FB) }));
server.post('/', (request, response, data) => {
    return FB.incoming(request, response, data => {
        const userData = FB.messageHandler(data);


        matcher(userData.content, data => {
            console.log(data.intent)
            switch (data.intent) {

                case 'Hello':
                    {
                        console.log(spotifyApi.getAccessToken())
                        if (spotifyApi.getAccessToken() == undefined) {
                            FB.sendMessage("RESPONSE", userData.sender, "Bonjour, Merci de vous connecter à spotify grâce à ce lien pour utiliser ce ChatBot\nLien :https://4b9eb637f58f.ngrok.io/login");


                        } else {

                            const data = getMyData()
                            FB.sendMessage("RESPONSE", userData.sender, "Vous etes bien connecter ".concat(data))

                        }

                        break;
                    }
                case 'CurrentWeather':
                    {
                        FB.sendMessage("RESPONSE", userData.sender, "yes");
                        break;
                    }
                case 'Exit':
                    {
                        FB.sendMessage("RESPONSE", userData.sender, "Bye");
                        break;
                    }
                default:
                    {
                        FB.sendMessage("RESPONSE", userData.sender, "Veuillez réessayer!");
                    }
            }
        })



    });
});