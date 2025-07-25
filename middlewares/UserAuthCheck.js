const jwt = require("jsonwebtoken");
const User = require("../models/User");

const UserAuthCheck = function(req, res, next){
    const {token}   = req.cookie;

    if( ! token ){
        return res.redirect("/login");
    }

    const userInfo = jwt.verify(token, "process.env.JWT_SECRET");

    if( ! userInfo ){
        return res.redirect("/login");
    }

    const user = User.findById(userInfo.id);

    if( ! user ){
        return res.redirect("/login");
    }

    req.user = user;
    next()

}

module.exports = UserAuthCheck;