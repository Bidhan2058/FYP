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
    findUserByMail(req.body.mail).then((response)=>{
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
    })
    .catch((error)=>{
        return next({
            msg : error,
            status : 400
        })
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
                name : user.username,
                fullname : user.fullname,
                email : user.mail,
                phone : user.contact.toString()

            })
        }


    })
}

const findUserByMail=(email)=>{
    return new Promise((resolve,reject)=>{
        UserModel.findOne({mail:email},(err,user)=>{
            if(err){
                return reject(err)
            }
            if(user){
             return  reject("User already registered with your mail")
            }
            if(!user){
                resolve(true)
            }
        })
    })
}



module.exports = {
    register,
    login,
}