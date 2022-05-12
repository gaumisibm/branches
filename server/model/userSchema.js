const mongoose= require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    messages:[
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            number:{
                type:Number,
                required:true
            },
            message:{
                type:String,
                required:true
            }
        }
    ],
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

// we are not using async function because we have to use this.(dot) in function and arrow func not allow
userSchema.methods.generateAuthToken = async function(){
    try {
        let tokenGaurav = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:tokenGaurav});
        await this.save();
        return tokenGaurav;
    } catch (error) {
        console.log(error)
    }
}

userSchema.methods.insertMessage = async function(name,email,number,message){
    console.log("Inside Insert Message function")
    try {
        this.messages= this.messages.concat({name,email,number,message})
        await this.save();
        return;
    } catch (error) {
        console.log(error);
    }
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
})

const User=mongoose.model('users',userSchema) // 'users' is the name of the collection inside our 'mernstack' database

module.exports = User;

