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
    clientID: '********************************',
    clientSecret: '*************************',
    callbackURL: "http://localhost:8081/google/callback"
  },//função que retorna dados do usuario pelo profille
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.use(new FacebookStrategy({
  clientID: '*************',
  clientSecret: '*****************',
  callbackURL: "http://localhost:8081/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile)
}
));
