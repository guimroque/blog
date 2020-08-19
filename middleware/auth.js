const UserService = require("../Service/UserService")

class AuthController{

    login(req, res, next){
        if(req.user){
            console.log('md ok')
            next();
        }else{
            res.render('login')
        }
    }  
}

module.exports = new AuthController();