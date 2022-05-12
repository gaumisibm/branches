//mongodb+srv://gaumisibm:<password>@cluster0.momiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser ());

dotenv.config();
require('./db/conn') // connection is established
// const User = require('./model/userSchema')
app.use(express.json()) // here we are saying to express that if json comes on server parse the object and show us.
app.use(require('./router/auth'))
const PORT= process.env.PORT

// Middleware
// we are using middleware to add an extra layer of authentication
// if certain conditions is fulfilled then only execute the about functionallity
// in this case

// const middleware = (req,res,next)=>{
//     console.log("this is middleware page")
//     if(true)
//     {
//         next()
//     }
//     else{
//         res.send("You are not authorized to view this page")
//     }
// }

// We can comment line number 18 to 50 as we have moved our router logic to auth.js
// /, /register route will go inside auth.js file and then app.listen will get executed

app.get('/', (req,res)=>{
    res.send("Hello from the server");
})

// app.get('/about', middleware, (req,res)=>{
//     res.send("Hello from the About Me page");
// })

// app.get('/contact', (req,res)=>{
//     res.send("Hello from the contact page");
// })

// app.get('/signin', (req,res)=>{
//     res.send("Hello from the Login page");
// })

// app.get('/signup', (req,res)=>{
//     res.send("Hello from the signUp page");
// })

app.listen(PORT,()=>{
    console.log(`Server is running at port no ${PORT}`)
})