var express = require("express")
var router = express.Router();

const UserController = require('../controller/UserController');
const middleware = require('../middleware/auth');

router.get('/publicar',middleware.login, UserController.publicar);

router.post('/add',UserController.addpub);

//router.post('/addimg',UserController.addimg);

router.get('/artigo/:id', UserController.artigo);

router.post('/pesquisa', UserController.pesquisa);

router.get('/recente', UserController.recente);

router.get('/help', UserController.help);

router.get('/index', UserController.index);

router.get('/mypublics', UserController.mypublics);




//router.get('/login', UserController.login);

//router.get('/registro', UserController.registro);



module.exports = router;