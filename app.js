const express = require("express");
// const route = require('./route');

//importing mysql
require('./database');
//creating main app or middle ware for project of express
const app= express();

app.use(express.json());//it recognizes the incoming json data 
app.use(express.urlencoded({extended: true}))

// Using routes
// app.use('/API', route);

app.listen(process.env.PORT, () =>{
    console.log('Server started');
})