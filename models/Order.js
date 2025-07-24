const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    transactionID : {
        type: String,
        required:true,
    },
     products : {
        type: Array,
        default:[],
    },
    status : {
        type: String,
        required:true,
        enum: ["complete", "processing", "on-hold", "cancelled"]
    },
    total: {
        type:Number,
        default:0.0
    },

    userID : {
        type:String,
        required:true
    },
    shipping_address: {
        type:String,
        default:""
    }    
});

module.exports = mongoose.model("Orders", ProductSchema);