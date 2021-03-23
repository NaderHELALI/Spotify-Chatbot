var SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional


const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

var spotifyApi = new SpotifyWebApi({
    clientId: '8d3054e1cf174dbc83fa54744238dd39',
    clientSecret: '3ceb7201b4674a3f980affc92723c003',
    redirectUri: 'https://513812ed4bfb.ngrok.io/callback'
});


module.exports = { spotifyApi, scopes };