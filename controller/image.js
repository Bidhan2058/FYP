const VehicleModel = require('../models/vehicle.model')
const path  = require('path');
const { getVehicleById } = require('../services/vehicle');

function singleImg (req,res,next) {
    var fileInfo = req.file;  //file ko name yeha aaucha multer bata success vayesi 
    var vehicleID = req.params.vehicleID;  //parameterko id liyeko
    if (req.file.filename) {
        console.log("File"+fileInfo)
        getVehicleById(vehicleID)  // promise ko repsonse aayesi matrta .then call huncha 
        .then((vehicle)=>{ //success huda / resolve huda data yeha aaucha 
            vehicle.vehicleImg = 'http://10.0.2.2:8000/static/' + fileInfo.filename;
            // IF WE PUT LOCALHOST IN THE URL ,THEN FLUTER GIVES US ERROR SO WE ASRE USING 10.0.2.2
            vehicle.save((err,done)=>{
                if(err){
                    return next({
                        msg: "Image couldnot be saved",
                        status : 400
                    })
                    // {
                    //     msg: "Image couldnot be saved",
                    //     status : 400
                    // }
                }
                else{
                    res.json({  // RES.JSON VNAYA FRONTEND MA DATA PATHAUNI
                        msg : "Image added successfully",
                        status : 200 
                    })
                }
            })
        })
        .catch((error)=>{ //reject huda /error huda
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

// function getImageID(req, res) {
//     res.sendFile('C:/Users/brother/OneDrive/Desktop/FYP/Backend/Frontuploads' + req.params.id);
// }
module.exports ={
    singleupload : singleImg,

};
