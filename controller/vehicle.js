const VehicleModel  = require('../models/vehicle.model');
const { vehicleQuery } = require('../services/vehicle');

exports.addVehicle = (req,res,next) => {
    const id = req.params.userID
    // console.log(id);
    console.log("inside addVehicle",req.body);
    console.log(req.body) //storing all the value from form to varialbes
    let vehiclemodel = vehicleQuery(req.body)
    vehiclemodel.userID = id
    vehiclemodel.save((err,done)=>{
        if(err){
            return next({
                msg : "Vehicle is not added",
                status : 400
            })
        }
        res.json({
            msg : "Vehicle Added Successfully",
            status : 200,
            success : true,
            vehicleID : done._id
        })
    })
}

exports.getVehicles=(req,res,next) =>{
    VehicleModel.find({},(error,vehicles)=>{
        if(error){
            return next({
                msg : error,
                status : 400
            })
        }
        if(vehicles){
            res.json({
                success :true,
                data : vehicles
            })
        }
    })
}

exports.getVehiclesofUser = (req,res,next)=>{
    let id = req.params.userID;
    console.log("id",id)
    VehicleModel.find({userID: id},(err,vehicles)=>{
        if(err){
            return next({
                msg : err,
                status : 400
            })
        }
        if(vehicles){
            res.json({
                success:true,
                data : vehicles
            })
        }
    })
}

exports.deleteVehicleById =(req,res,next)=>{
    let vehicleID = req.params.vehicleID;
    VehicleModel.findByIdAndDelete({_id : vehicleID},(err,deleted)=>{
        if(err){
            return next({
                msg : err,
                status : 400
            })
        }
        if(deleted){
            res.json({
                success: true
            })
        }
    })
}
