const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const personalityInsights = new PersonalityInsightsV3({
  username: process.env.PERSONALITYUSERNAME,
  password: process.env.PERSONALITYPASS,
  version_date: '2016-10-19',
  url: 'https://gateway.watsonplatform.net/personality-insights/api/'
});

const toneAnalyzer = new ToneAnalyzerV3({
  username: process.env.TONEUSERNAME,
  password: process.env.TONEPASS,
  version_date: '2016-05-19',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});

const nlu = new NaturalLanguageUnderstandingV1({
  username: process.env.NLUUSERNAME,
  password: process.env.NLUPASS,
  version_date: '2017-02-27',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

module.exports = {
  getPersonalityInsights: (text) => {
    return new Promise((res) => {
      personalityInsights.profile(
        {
          content: text,
          content_type: 'text/plain',
          consumption_preferences: true
        },
        (err, insights) => {
          if (err) {
            console.log('error:', err);
          } else {
            //console.log(JSON.stringify(insights, null, 2));
            return res(insights);
          }
        }
      );
    })
  },
  analyzeTone: (text) => {
    return new Promise((res) => {
      toneAnalyzer.tone(
        {
          tone_input: text,
          content_type: 'text/plain'
        },
        (err, tone) => {
          if (err) {
            console.log(err);
          } else {
            //console.log(JSON.stringify(tone, null, 2));
            return res(tone)
          }
        }
      );
    })
  },
  understandNaturalLanguage: (text) => {
    return new Promise((res) => {
      nlu.analyze(
        {
          html: text, // Buffer or String
          features: {
            entities: {},
            keywords: {}
          }
        },
          (err, understood) => {
            if (err) {
              console.log('error:', err);
            } else {
              //console.log(JSON.stringify(understood, null, 2));
              res(understood)
            }
          }
      );
    })
  }
}