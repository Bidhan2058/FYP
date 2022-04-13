const VehicleModel = require('../models/vehicle.model')
const path  = require('path');
const { getVehicleById } = require('../services/vehicle');

function singleImg (req,res,next) {
    var fileInfo = req.file;
    console.log(fileInfo);
    var vehicleID = req.params.vehicleID;
    console.log("vehicel"+vehicleID)
    if (req.file.filename) {
        console.log("File"+fileInfo)
        getVehicleById(vehicleID)
        .then((vehicle)=>{
            vehicle.img = 'http://10.0.2.2:8000/static/' + fileInfo.filename;
            vehicle.save((err,done)=>{
                if(err){
                    return next({
                        msg: "Image couldnot be saved",
                        status : 400
                    })
                }
                else{
                    res.json({
                        msg : "Image added successfully",
                        status : 200 
                    })
                }
            })
        })
        .catch((error)=>{
            return next({
                msg : err,
                status : 400
            })
        })
     
    } else {
        return next({
            msg : "Something happend in the server",
            status : 400
        })
    }
}

function getImageID(req, res) {
    res.sendFile('C:/Users/brother/OneDrive/Desktop/FYP/Backend/Frontuploads' + req.params.id);
}
module.exports ={
    singleupload : singleImg,
    getImageID,
};
