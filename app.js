const express = require("express");
const route = require('./routes/auth/route');
const vehicleroute = require('./routes/vehicle/vehicleroute')
const imgroute = require('./routes/images/imagesroute')
const requestRoute = require('./routes/requestRoute/requestRoute')
const path = require('path');

require('./database')

//importing mysql

//creating main app or middle ware for project of express
const app= express();

app.use(express.json());//it recognizes the incoming json data 
app.use(express.urlencoded({extended:true}))

app.use('/static', express.static(path.join(__dirname, 'Frontuploads'))) 
// Using routes
app.use('/API', route);

app.use('/API',vehicleroute);

app.use('/API',imgroute);
app.use('/API',requestRoute);

app.use((req,res,next)=>{
    return next({
        error: "Error",
        status : 400
    })
})

app.use((error,req,res,next)=>{
    console.log(error);
    res.status(error.status || 400)
    res.send({
        message : error.msg || "error",
        status : error.status || 400
    })
})

app.listen(process.env.PORT, () =>{
    console.log('Server started',process.env.PORT);
})