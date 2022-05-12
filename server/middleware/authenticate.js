const jwt = require("jsonwebtoken");
const User = require("../model/userSchema")


const authenticate = async(req,res,next) =>{
    console.log("Hi");
    try {
        const token= req.cookies.jwtoken;
        console.log(token);//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc4ZDlmNjJiNWY5NDlkZDdkOTQ3MTkiLCJpYXQiOjE2NTIxMDY3MTJ9.hDpamdRILth-tQcTrFWNZAg8M1pNZt9exQaVYGpc50o
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        console.log(verifyToken); //{ _id: '6278d9f62b5f949dd7d94719', iat: 1652106712 }
        const rootUser = await User.findOne({_id : verifyToken._id, "tokens.token": token})
        if(!rootUser){
            throw new Error("User not found")
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
         
        next();
    } catch (error) {
        res.status(401).send("Unathorized User")
        console.log(error);
    }
}

module.exports = authenticate;