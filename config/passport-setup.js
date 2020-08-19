const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
      done(null, user);
});

passport.use(new GoogleStrategy({//configurando passport com dados da API do google
    clientID: '701663066930-1fb9a9qt6250ubsmadltukvv3c5raokt.apps.googleusercontent.com',
    clientSecret: 'wPzKOWkvAld2xn4hU431Da77',
    callbackURL: "http://localhost:8081/google/callback"
  },//função que retorna dados do usuario pelo profille
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.use(new FacebookStrategy({
  clientID: '760626761395615',
  clientSecret: '4a474323e065b14f864e816e9f37e2ef',
  callbackURL: "http://localhost:8081/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile)
}
));