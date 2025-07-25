const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt      = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required:true,
        unique:true
    },
     email : {
        type: String,
        required:true,
        unique:true
    },
    password : {
        type: String,
        required:true
    },
    first_name : String,
    last_name : String,
    balance: {
        type:Number,
        default:0
    },
    products: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
});

UserSchema.pre("save", async function(next){
    const isModified = this.isModified("password");

    if( !isModified ){
        next();
    }

    const salt = bcrypt.genSaltSync(10);
    const modified = bcrypt.hashSync(this.password, salt );
    this.password  = modified;
});//this method will run whenever there is 



UserSchema.methods.getBalance = function(){
    return this.balance;
}


UserSchema.methods.sendNotification = function(type, custom = false){
    let message = custom;
    switch(type){
        case "register" :            
            if( ! custom ){
                message = `Hello ${this.username} <br> You have <strong>successfully</strong> on Our Site. <br> <a href="">Click Here</a> To Manage Account Now`;
            }
        default :
            message = "Thanks for being at our site"
    }

    //continue the rest of your notification logic here.
}

UserSchema.methods.getJsonWebToken = function(){
    const UserInfo = {
        id : this._id,
        username: this.username,
    };
    const signature = jwt.sign(UserInfo, "process.env.JWT_SECRET", {
        expiresIn: "3d"
    });

    return signature;
}

UserSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password );
}

UserSchema.methods.addBalance = function(value){
   this.balance += parseFloat( value );
   this.save();
}

UserSchema.methods.deductBalance = function(value){
   this.addBalance(-value);
}

module.exports = mongoose.model("User", UserSchema);