var express = require("express")
var router = express.Router();
const IndexController = require('../controller/IndexController');
//const middleware = require('../middleware/auth')



router.get('/recente', IndexController.recente);

router.get('/help', IndexController.help);

router.get('/login', IndexController.login);

router.get('/artigo/:id', IndexController.artigo);

router.post('/pesquisa', IndexController.pesquisa);

router.get('/', IndexController.index);


module.exports = router;