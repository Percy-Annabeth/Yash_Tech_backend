const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Your name."],
        minLength:[4,"Name should have more than 4 characters"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please enter Your email."],
        unique:[true,"this email is already taken"],
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter Your password."],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    },
});

//to hash passowrd just before saving the user.
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,8);
});

//JWT token 
userSchema.methods.getJWTtoken = function (){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:2*24*60*60*1000,
    });
};

//comparePassword method
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports=mongoose.model("User",userSchema);
