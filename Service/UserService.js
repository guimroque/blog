var Database = require("../models/index");
const { or } = require("sequelize");
class UserService{
    constructor(){//trazendo banco de dados para o arquivo
        this.post = Database["post"];                
    }
    //salvando artigos
    async store(envio){
        console.log(envio)
            try{
                await this.post.create(envio);
                return null
            }catch(errors){
                return errors
            }
        }
    //listando artigos mais vistos
     mVistos(page){
        var offset = 0;
        if(isNaN(page)|| page == 1){
            offset = 0;
        }else{
            offset = parseInt(page)*3;
        }
        console.log(offset+' = offset')
        try{
            var miss = [] 
            miss = this.post.findAll({
                limit:30,
                order: [
                    ['vistos' , 'DESC']
                ]
            })
            return miss
           }catch(err){
               return err
           }

    }
    //listando artigos mais recentes
    mRecentes(){
        try{
            console.log('cheguei na listagem')
            var miss = [] 
            miss = this.post.findAll({
                limit: 30,
                order: [
                    ['createdAt' , 'DESC']
                ]
            })
            return miss
           }catch(err){
               return err;
           }

    }
    //procurando artigo pelo ID
    async buscarArtigo(id){
        try{
           var artigo= await this.post.findOne({
                where:{
                    id:id
                }
            })
            console.log(artigo)
            return artigo;
        }catch(err){
            return err;
        }
    }
    //procurando por meus artigos
    async myArticles(nome){
        try{
           var artigo= await this.post.findOne({
                where:{
                    autor:nome
                },
                order: [
                    ['createdAt' , 'DESC']
                ]
            })
            console.log('retornando artigo: '+artigo)
            return artigo;
        }catch(err){
            return err;
        }
    }
    //pesquisando por artigo
    async pesquisar(artigo){
        try{
            console.log(artigo)
            
            var post= await this.post.findOne({
                 where:{
                     title:artigo,
                 },
                 order: [
                     ['createdAt' , 'DESC']
                 ]
             })
             console.log('service: '+post)
             return post;
         }catch(err){
             return err;
         }
    }
    async contador(artigo){
        console.log('artigo')
        console.log(artigo.vistos)
        try{
                await artigo.update({
                vistos: artigo.vistos+1
            })
            console.log('artigo atualizado: '+artigo)
         }catch(err){
             return err;
         }
        return;
    }

        
}
module.exports = new UserService();