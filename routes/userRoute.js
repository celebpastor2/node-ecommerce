const express = require("express");
const User      = require('../models/User');
const route = express.Router();
const bcrypt = require("bcrypt");

function userMiddleware(req, res, next){
    next();
}

route.get('/login', userMiddleware, (req, res)=>{
    res.render("login");
});

route.post('/login',(req, res)=>{
    const {username, password} = req.body;
    const user = User.find({username});

    if( user && user.username && user.password ){
        if(  bcrypt.compareSync( user.password, password)){
            res.cookie("loginId", user._id );
            res.cookie("userToken", token, 
                {
                    maxAge: Date.now() + (3600 * 24 * 3)
                }
            )
            res.redirect("/dashboard");
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

        const checkUser = User.find({username});

        if( checkUser && checkUser?.username && checkUser?.username == username ){
            res.status(300).json({
                error:"user already exist"
            });
            return;
        }

        const user = new User({
            username:username,
            password:bcrypt.hashSync( password, 10 ),
            email:email
        });
        user.save();

        if( user && user.username ){
            res.cookie("loginId", user._id);
            res.json({user:user});
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