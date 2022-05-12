const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require("../middleware/authenticate")

require('../db/conn')
const User = require('../model/userSchema')

router.get('/',(req,res)=>{
    res.send("we are in the router folder ");
})

// Async await 
// await will only work inside async function

router.post('/register',async (req,res)=>{

    const {name, email, number, profession, password, cpassword}= req.body

    if(!name || !email || !number || !profession || !password || !cpassword){
        res.status(422).json({error : "please fill all the input"})
    }

    try{
        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(422).json({error: "Email already exist"})
        }else if(password != cpassword){
            return res.status(422).json({error: "Password not matching"})
        }
        else{
            const user = new User({name, email, number, profession, password, cpassword});
            // new is creating an instance of User schema and then we are saving it in our database
            await user.save();
            res.status(201).json({message : "User registered successfully"});
        }
    }catch(err){
        console.log(err)
    }
})

//Using promises we are writing .then but it is not required in case of async function as we are having try and catch their
// router.post('/register',(req,res)=>{
//     const {name, email, phone, work, password, cpassword}= req.body
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         res.status(422).json({error : "please fill all the input"})
//     }
//     User.findOne({email: email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error: "Email already exist"})
//         }
//         const user = new User({name, email, phone, work, password, cpassword});
//         user.save().then(()=>{
//             res.status(201).json({message : "User registered successfully"});
//         }).catch((err)=>res.status(500).json({error: "failed to register"}))
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

router.post('/signin',async (req,res)=>{
    const {email, password} = req.body
    let token;

    if(!email || !password){
        res.status(422).json({error: "These all field are required "})
    }
    try{
        const resu = await User.findOne({email:email})
        if(!resu){
            res.status(422).json({error : "Email not exists in the db"})
        }
        const isMatched = await bcrypt.compare(password,resu.password)
        token = await resu.generateAuthToken();
        res.cookie("jwtoken",token,{
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        })
        if(isMatched)
        {
            res.status(201).json({message: "Login successfully"})
        }
        else{
            res.status(400).json({message: "password is incorrect"})
        }
    }catch(err){
        console.log(err)
    }
})

router.get('/about',authenticate, async (req,res)=>{
    console.log(`hello my about`);
    res.send(req.rootUser)
    // res.send(`Hello world from the about page`)
})

router.get('/home',authenticate, async (req,res)=>{
    console.log(`hello home page`);
    res.send(req.rootUser)
    // res.send(`Hello world from the about page`)
})

router.get('/logoutMe',async (req,res)=>{
    console.log(`hello Logout page`);
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).json({message : "User logged out successfully"})
    //task for you to implement this logout functionality in frontend only
    // res.send(req.rootUser)
    // res.send(`Hello world from the about page`)
})

router.post('/contactUs',async(req,res) =>{
    try {
        const {name, email, number, message}= req.body
        console.log(message);
        //res.send("successfully in contactUs page")// you cannot use send something to the frontend as this is post method from the frontend
        // res.status(200).json({message: "Success "}) // if you will send res before the body you will get ERR_HTTP_HEADERS_SENT error
        const userWa =await User.findOne({email:email})
        if(!userWa){
            res.status(400).json({message: "there is no such user"})
        }
        else{
            let mess = await userWa.insertMessage(name,email,number,message);
            await userWa.save();
            res.status(200).json({message: "Messsge is successfully inserted in DB"})
        }
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router;