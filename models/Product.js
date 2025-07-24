const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true,
    },
     description : {
        type: String,
        required:true,
    },
    image : {
        type: String,
        required:true
    },
    price: {
        type:Number,
        default:0.0
    },
    
});

module.exports = mongoose.model("Product", ProductSchema);