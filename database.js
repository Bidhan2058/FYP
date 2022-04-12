const mongoose = require('mongoose');
const dotenv = require('dotenv');//dotenv for securing information 
dotenv.config(); // providing path of .env file 
const CONXN_URL = `mongodb://localhost:27017/${process.env.DBNAME}`

//creating connection with certain sql database
const db = mongoose.connect(CONXN_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
//connecting  to database 
,function(err){
    if(err){
       return console.log("DB connection failed")
    }
    console.log("Db connection succeded")
})

