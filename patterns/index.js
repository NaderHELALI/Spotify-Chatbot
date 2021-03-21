const patternDict = [{
  pattern: '\\b(?<greeting>Hi|Hello|Hey|Salut|Bonjour)\\b',
  intent: 'Hello'
},
{
  pattern: '\\b(Bye|Exit|Kill)\\b',
  intent: 'Exit'
},
{
  pattern: 'weather\\sin\\s\\b(?<city>[a-z]+[ a-z]+?)',
  intent: 'CurrentWeather'
}
];

module.exports = patternDict;
