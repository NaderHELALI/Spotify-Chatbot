const patternDict = [{
        pattern: '\\b(?<greeting>Hi|Hello|Hey|Salut|Bonjour)\\b',
        intent: 'Hello'
    },
    {
        pattern: '\\b(Bye|Exit|Kill)\\b',
        intent: 'Exit'

    }, {
        pattern: '\\b(recommend a playlist)\\b',
        intent: 'CurrentWeather'
    },
    {
        pattern: 'recommande\\smoi\\splaylist\\b',
        intent: 's'
    },
    {
        pattern: 'playlist de \\b(?<genre>[a-z]+[ a-z])',
        intent: 'Genre'
    }, {
        pattern: 'musique de \\b(?<artist>[a-z]+[ a-z])\\b',
        intent: 'Artist'
    }


];

module.exports = patternDict;