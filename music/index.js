"use strict ";
var SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '8d3054e1cf174dbc83fa54744238dd39',
    clientSecret: '8d3054e1cf174dbc83fa54744238dd39',
    redirectUri: 'http://localhost:3000/callback'
  });

module.exports = Music;
