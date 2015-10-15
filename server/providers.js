module.exports = function (options) {
var boot = require('loopback-boot');
var env = options.env || process.env.NODE_ENV || 'development';
var appRootDir = options.appRootDir = options.appRootDir || process.cwd();
var ConfigLoader = boot.ConfigLoader;
var appConfig = ConfigLoader.loadAppConfig(appRootDir, env);

return {
  "facebook-login": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": appConfig.facebookClientID,
    "clientSecret": appConfig.facebookClientSecret,
    "callbackURL": appConfig.facebookCallbackURL,
    "authPath": "/auth/facebook",
    "callbackPath": "/auth/facebook/callback",
    "successRedirect": "/auth/account",
    "scope": ["email"]
  },
  "facebook-link": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": "{facebook-client-id-2}",
    "clientSecret": "{facebook-client-secret-2}",
    "callbackURL": "http://localhost:3000/link/facebook/callback",
    "authPath": "/link/facebook",
    "callbackPath": "/link/facebook/callback",
    "successRedirect": "/link/account",
    "scope": ["email", "user_likes"],
    "link": true
  },
  "facebook-login-token": {
    "provider": "facebook",
    "module": "passport-facebook-token",
    "clientID": appConfig.facebookClientID,
    "clientSecret": appConfig.facebookClientSecret,
    "callbackPath": "/auth/facebook/callback-token",
    "scope": ["email"],
    "json": true,
    "callbackPathHttpMethod":"POST"
  },
  "google-login": {
    "provider": "google",
    "module": "passport-google-oauth",
    "strategy": "OAuth2Strategy",
    "clientID": appConfig.googleClientID,
    "clientSecret": appConfig.googleClientSecret,
    "callbackURL": appConfig.googleCallbackURL,
    "authPath": "/auth/google",
    "callbackPath": "/auth/google/callback",
    "successRedirect": "/auth/account",
    "scope": ["email", "profile"]
  },
}
}