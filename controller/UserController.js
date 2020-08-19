const UserService = require("../Service/UserService")

class UserController{
    
    //Listar arquivos pela ordem de mais vistos
    async index(req, res){
        var page = req.params.num;
        console.log(page)
        try{
            var post =  await UserService.mVistos(page)
        res.render('user/index', {post:post});
        }catch(err){
            console.log(err)
            res.redirect('/user/index')
        }
    }
    //burcar arquivo em especifico pelo ID
    async artigo(req, res){
        var id = req.params.id;
        try{
            var artigo = await UserService.buscarArtigo(id)
            console.log('encontrado: ')
           await UserService.contador(artigo)
            res.render('user/articles', {artigo:artigo})
        }catch(err){
            res.redirect('index');
        }
    }
    //listar arquivos por mais recentes
    async recente(req, res){
        try{
            var post =  await UserService.mRecentes()
        res.render('user/recentes', {post:post});
        }catch(err){
            console.log(err)
            res.redirect('/user/index')
        }
    }

    help(req, res){
        res.render('user/comofunciona')
    }
    //listar minhas publicações
    async mypublics(req, res){
        var nome = req.user.displayName;
        console.log(nome)
        try{
            var artigo = await UserService.myArticles(nome)
            console.log(artigo+ 'controller')
            res.render('user/mypublics', {post:artigo})
        }catch(err){
            console.log('erro: '+err)
            res.redirect('index');
        }
    }
    //pesquisa de postagem
    async pesquisa(req, res){
        console.log('cheguei no controllerr')
        console.log(req.body.artigo)
        var artigo = req.body.artigo;
        try{
            var artigo = await UserService.pesquisar(artigo)
            console.log(artigo.title)
            res.render('user/pesquisa', {post:artigo})
        }catch(err){
            console.log('nao encontrado')
            res.render('user/pesquisa', {post:null});
        }
    }

    publicar(req, res){
        res.render('user/publicar')
    }
    //adicionando publicação
    async addpub(req, res){
        var {title, slug, email} = req.body
        var post = req.body.body
        var autor = req.user.displayName
        console.log(title, slug, post, email, autor)
        var envio = {
            title: title,
            slug:slug, 
            post:post,
            email:email,
            autor:autor,
            vistos: 0,
        }
        try{
            console.log(envio)
            await UserService.store(envio)
            res.redirect('/user/index')
        }catch(err){
            console.log(err)
        }

    }
   

}

module.exports = new UserController();