const UserModel = require('../models/user.model');
const passwordHash = require('password-hash');
const userQuery = require('../helpers/user.query');
const jsonwebtoken = require("jsonwebtoken");


const Generatetoken = (userId) => {
    return jsonwebtoken.sign({ id: userId }, process.env.SECRETKEY, { expiresIn: "10d" })
}

const register = (req, res, next) => {
    let data = req.body;
    console.log("register",req.body)
    let user = new UserModel({});
    userQuery.mapUser(data, user);
    user.password = passwordHash.generate(data.password)
    console.log("user model",user.mail);
    user.save((err, user) => {
        if (err) {
            console.log(err);
            next({
                msg: "User already registered",
                status: 400
            })
        }
        else {
            console.log("Registered successfully");
            res.json({
                msg: "Registered successfully",
                status: 200,
                data: user
            })
        }
    })

}

const login = (req, res, next) => {
    console.log("hello",req.body);
    UserModel.findOne({mail: req.body.mail
    }, (err, user) => {
        if (err) {
            return next({
                msg: "hello",
                status: 400
            })
        }
        if(!user){
            return next({
                msg:"Username or password is invalid",
                status: 400
            })
        }
        if (user) {
            let passwordCheck = passwordHash.verify(req.body.password, user.password)
            if (!passwordCheck) {
                return next({
                    msg: "Username or password is invalid"
                })
            }
            let token = Generatetoken(user._id)
            res.json({
                user: user,
                token,
                id : user._id,
                name : user.username
            })
        }


    })
}

const getUser = (req,res,next)=>{
    const id = req.params.id;
    console.log("id",id)
    UserModel.find({_id : id},(err,users)=>{
        if(err){
            return next({
                msg : err,
                status : 400
            })
        }
        if(users){
            res.json({
                users
            })
        }
    })
}

module.exports = {
    register,
    login,
    getUser
}