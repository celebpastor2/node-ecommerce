const express = require("express")
const route = express.Router()

function userMiddleware(req, res, next){
    next();
}

route.get('/login', userMiddleware, (req, res)=>{
    const variable = ["one", "two", "three", "four", "five"];
    res.render("login", {
        arr_guard:variable
    });
});

module.exports = route;