const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let VehicleSchema = new Schema({  // kaSTO KHALKO DATA RAKHNI 
    vehicleType: {
        type: String
    },
    vehicleModel:{
        type: String,
        required: true
    },
    vehicleNoPlate :{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    distanceTravelled:{
        type: String,
        required: true
    },
    userID : Schema.Types.ObjectId,
    vehicleImg:String
})

module.exports = mongoose.model('vehicle',VehicleSchema) //yesley ley db ma gayera document / table banaidicnah 
// exporting it to use for finding , editing or deleteting data