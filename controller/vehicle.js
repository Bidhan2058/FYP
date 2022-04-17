const VehicleModel = require('../models/vehicle.model');
const { vehicleQuery } = require('../services/vehicle');
const fs = require('fs');
const path = require('path');
const { resolve } = require('path');

exports.addVehicle = (req, res, next) => {
    const id = req.params.userID //PARAMETER LEKO
    // console.log(id);
    let vehicleModel = new VehicleModel(); //TO ADD NEW DATA IN DB
        //REQ.BODY MA DATA AAUCHA REQ.FILE MA FILE AAUCHA 
    console.log("inside addVehicle", req.body);
    console.log(req.body) //storing all the value from form to varialbes
    let vehiclemodel = vehicleQuery(req.body, vehicleModel)
    vehiclemodel.userID = id
    vehiclemodel.save((err, done) => {
        if (err) {
            return next({
                msg: "Vehicle is not added",
                status: 400
            })
        }
        res.json({  //SUCCESS HUDA 
            msg: "Vehicle Added Successfully",
            status: 200,
            success: true,
            vehicleID: done._id
        })
    })
}

exports.getVehicles = (req, res, next) => {
    VehicleModel.find({}, (error, vehicles) => {
        if (error) {
            return next({
                msg: error,
                status: 400
            })
        }
        if (vehicles) {
            res.json({
                success: true,
                data: vehicles
            })
        }
    })
}

exports.getVehiclesofUser = (req, res, next) => {
    let id = req.params.userID;
    console.log("id", id)
    VehicleModel.find({ userID: id }, (err, vehicles) => {
        if (err) {
            return next({
                msg: err,
                status: 400
            })
        }
        if (vehicles) {
            res.json({
                success: true,
                data: vehicles
            })
        }
    })
}

exports.deleteVehicleById = (req, res, next) => {
    let vehicleID = req.params.vehicleID;
    VehicleModel.findByIdAndDelete({ _id: vehicleID }, (err, deleted) => {
        if (err) {
            return next({
                msg: err,
                status: 400
            })
        }
        if (deleted) {
            res.json({
                success: true
            })
        }
    })
}

exports.editVehicleById = (req, res, next) => {
    let vehicleID = req.params.vehicleID;
    let data = req.body;
    console.log("inside edit")
    console.log(vehicleID);
    VehicleModel.findById(vehicleID, (err, vehicle) => {
        if (err) {
            return next({
                msg: err,
                status: 400
            })
        }
        if (vehicle) {
            let fileName = vehicle.vehicleImg.split('http://10.0.2.2:8000/static/')[1];
            console.log(fileName);
            removeFile(fileName)
                .then((done) => {
                    const UpdatedvehicleModel = vehicleQuery(data, vehicle)
                    UpdatedvehicleModel.save((err, done) => {
                        if (err) {
                            return next({
                                msg: "Vehicle is not edited",
                                status: 400
                            })
                        }
                        res.json({
                            msg: "Vehicle edited Successfully",
                            status: 200,
                            success: true,
                            vehicleID: done._id,
                            data: vehicle,

                        })
                    })

                    // res.json({
                    //     success: true,
                    //     status: 200
                    // })

                })
                .catch((err) => {
                    return next(({
                        msg: err,
                        status: 400
                    }))
                })

        }
    })
}

const removeFile = (filename) => {
    let fileurl = path.join(process.cwd(), '/FrontUploads')

    return new Promise((resolve, reject) => {
        fs.unlink(`${fileurl}/${filename}`, (err, done) => {
            if (err) {
                return reject(err)
            }
            console.log("file removed")
            resolve(done)
        })
    })

}