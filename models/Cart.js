const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    products : {
        type:Array,
        default:[]
    },
    total: {
        type:Number,
        default:0
    },
    userID:{
        type:String,
        default:""
    }  
});

module.exports = mongoose.model("Cart", ProductSchema);