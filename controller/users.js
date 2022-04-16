// const db = require('../database');
// const jwt =require ('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');
const userQuery = require('../helpers/user.query');

exports.getUser = (req,res,next)=>{
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

exports.updateuser=(req,res,next) =>{
    const id = req.params.userID;
    console.log("userId inside update user",id)
    const data = req.body;
    console.log("u[date profile",data);
    UserModel.findOne({_id : id}, (err,user)=>{
        if(err){
            return next({
                msg : err,
                status : 400
            })
        }
        if(user){
             let userinfo = userQuery.mapUser(data,user);
             userinfo.save((err,done)=>{
                if(err){
                    return next({
                        msg : err,
                        status : 400
                    })
                }
                if(done){
                    res.json({
                        success: true,
                        user : done
                    })
                }
            })
        }
    })
}