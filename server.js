'use strict';
const bodyparser = require('body-parser');

const express = require('express');
const config = require('./config');
const FBeamer = require('./fbeamer');

var SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '8d3054e1cf174dbc83fa54744238dd39',
    clientSecret: '8d3054e1cf174dbc83fa54744238dd39',
    redirectUri: 'http://localhost:3000/callback'
});

const matcher = require('./matcher');
const server = express();
const PORT = process.env.PORT || 3000;

const FB = new FBeamer(config.FB);


server.get('/login', (req, res) => res.redirect(spotifyApi.createAuthorizeURL(scopes)));
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
                        FB.sendMessage("RESPONSE", userData.sender, "Bonjour");
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