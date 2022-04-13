const VehicleModel  = require('../models/vehicle.model');
const { vehicleQuery } = require('../services/vehicle');

exports.addVehicle = (req,res,next) => {
    const id = req.params.userID
    // console.log(id);
    console.log("inside addVehicle",req.body);
    console.log(req.body) //storing all the value from form to varialbes
    let vehiclemodel = vehicleQuery(req.body)
    vehiclemodel.user = id
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
