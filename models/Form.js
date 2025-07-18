const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    inputs : {
        type:Object,
        default:{}
    },
    form: {
        type:String,
        required:true,
    },
     
});

module.exports = mongoose.Model("Forms", ProductSchema);