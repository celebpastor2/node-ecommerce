const mongoose = require("mongoose");
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

UserSchema.methods.getBalance = function(){
    return this.balance;
}

UserSchema.methods.addBalance = function(value){
   this.balance += parseFloat( value );
   this.save();
}

UserSchema.methods.deductBalance = function(value){
   this.addBalance(-value);
}

module.exports = mongoose.model("User", UserSchema);