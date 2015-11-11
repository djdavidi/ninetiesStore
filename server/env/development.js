module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "welcometothespacejam",
  "TWITTER": {
    "consumerKey": "INSERT_TWITTER_CONSUMER_KEY_HERE",
    "consumerSecret": "INSERT_TWITTER_CONSUMER_SECRET_HERE",
    "callbackUrl": "INSERT_TWITTER_CALLBACK_HERE"
  },
  "FACEBOOK": {
    "clientID": "INSERT_FACEBOOK_CLIENTID_HERE",
    "clientSecret": "INSERT_FACEBOOK_CLIENT_SECRET_HERE",
    "callbackURL": "INSERT_FACEBOOK_CALLBACK_HERE"
  },
  "GOOGLE": {
    "clientID": "834081013260-63b9g94fv7jko9g9f8ktr57h1e4ku7gu.apps.googleusercontent.com",
    "clientSecret": "yWtkxsvCG2Y0QYFC5iUgzLM6",
    "callbackURL": "http://localhost:1337/auth/google/callback"
  }
};