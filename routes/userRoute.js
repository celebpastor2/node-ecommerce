const express = require("express");
const User      = require('../models/User');
const route = express.Router();
const bcrypt = require("bcrypt");
const UserAuthCheck = require("../middlewares/UserAuthCheck");
const router = require("./shopRoute");

function userMiddleware(req, res, next){
    next();
}

route.get('/login', userMiddleware, (req, res)=>{
    res.render("login");
});

route.get('/dashboard', UserAuthCheck, (req, res)=>{
    const user = req.user;
    res.render("dashboard", {user});
});

route.post('/login',(req, res)=>{
    const {username, password} = req.body;
    const user = User.findOne({username});

    if( user && user.username && user.password ){
        const isMatched = user.verifyPassword(password);
        if(  isMatched ){
           const token = user.getJsonWebToken();
           const option = {
            expires: Date.now() + (60 * 60 * 24 * 1000 ), //1 day
            httpOnly: true,
           };
            res.status(200).cookie('token', token, option).redirect("/dashboard");
        } else {
            res.send("password incorrect")
        }
    } else {        
        res.status(200).json({
            error: "Invalid Credentials"
        });
    }

});

route.post('/register', (req, res)=>{
    const {username, password, email} = req.body;

    try {

        const checkUser = User.findOne({username});

        if( checkUser && checkUser?.username && checkUser?.username == username ){
            res.status(300).json({
                error:"user already exist"
            });
            return;
        }

        const user = new User({
            username:username,
            password,
            email,
        });
        user.save();

        if( user && user.username ){
            const token = user.getJsonWebToken();
            user.sendNotification("register");

            res.cookie("token", token, {
                httpOnly:true,
                expires: Date.now() + (60 * 60 * 24 * 1000)
            }).redirect("/dashboard");
        } else {        
            res.status(200).json({
                error: "Registeration Failed",
                user
            });
        }
    } catch(e){
        res.status(500).json({
            error: e.toString()
        });
    }
    

});

route.get('/register', userMiddleware, (req, res)=>{
    res.render("register");
});

module.exports = route;