const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path')

require('./config/passport-setup');
//importando rotas
const UserRouter = require('./routes/UserRouter')
const IndexRouter = require('./routes/IndexRouter')
// View engine
app.set('view engine','ejs');

app.use(express.static('public'));


//Body parser
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'login-session',
    keys: ['key1', 'key2'],
}))
//iniciando cookies
app.use(passport.initialize());
app.use(passport.session());

app.use('/index', IndexRouter);
app.use('/user', UserRouter);
//midleware
const isLoggedIn = (req, res, next)=>{
    if(req.user){
        next()
    }else{
        res.sendStatus(401);
    }
}
//rotas de autenticação
app.get('/failed', isLoggedIn, (req,res)=>res.send('Falha no login!'))
app.get('/success/google', isLoggedIn, (req,res)=>{
  console.log(req.user)
  res.send('Bem vindo '+req.user.displayName+'!')})
app.get('/user/index', isLoggedIn, (req,res)=>{
  console.log(req.user)
  res.send('Bem vindo '+req.user.displayName+'!')})
//trabalhando com passport, rota de autenticação e redirecionamento após login 
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),

  function(req, res) {
    // Autenticação feita com sucesso, redirecionar a pagina Home
    res.redirect('/user/index');
  });
app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/user/index');
  });
app.get('/logout', (req, res)=>{
    req.session = null;
    console.log(req.session)
    req.logout();
    res.redirect('/index');
})
// Router
    app.get("/", (req, res) => {
      res.redirect('/index')
    })
// End Router
app.listen(3000, () => {
    console.log("O servidor está rodando na porta 8081!")
})