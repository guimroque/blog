const UserService = require("../service/UserService")
//reaproveitando funções do User, pois executam a mesma coisa que preciso aqui pelo index
class IndexController{

    //listando artigos mais vistos
    async index(req, res){
        try{
            var post =  await UserService.mVistos()
        res.render('home/index', {post:post});
        }catch(err){
            console.log(err)
            res.redirect('/')
        }
    }
     //listar arquivos por mais recentes
     async recente(req, res){
        try{
            var post =  await UserService.mRecentes()
        res.render('home/recentes', {post:post});
        }catch(err){
            console.log(err)
            res.redirect('/user/index')
        }
    }
    help(req, res){
        res.render('index/comofunciona');
    }
    login(req, res){
        res.render('login');
    }
    //buscando artigo especifico pelo ID como index
    async artigo(req, res){
        var id = req.params.id;
        try{
            var artigo = await UserService.buscarArtigo(id)
            console.log('encontrado: ')
            await UserService.contador(artigo)
            res.render('home/articles', {artigo:artigo})
        }catch(err){
            res.redirect('index');
        }
    }

    async pesquisa(req, res){
        console.log('cheguei no controllerr')
        console.log(req.body.artigo)
        var artigo = req.body.artigo;
        try{
            var artigo = await UserService.pesquisar(artigo)
            console.log(artigo.title)
            res.render('home/pesquisa', {post:artigo})
        }catch(err){
            console.log('nao encontrado')
            res.render('home/pesquisa', {post:null});
        }
    }
    



}

module.exports = new IndexController();