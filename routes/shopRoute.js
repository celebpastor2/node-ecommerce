const express = require("express");
const router  = express.Router();
const Product = require("../models/Product");
const User      = require("../models/User");

router.get('/', (req, res)=>{
    const products = Product.find();
    res.render("shop",{
        "products":products
    });
});

router.get('/shop/:id', (req, res)=>{
    const {id} = req.params;
    const user  = User.findById(id).populate("Product");
    const products = user.products;
    res.render("user_shop", {
        "products":products
    });
});