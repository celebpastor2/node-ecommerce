const express = require("express");
const app      = express();
const path     = require("path");
const port      = 5000;
const hostname = "localhost";
const mongoose = require("mongoose");
const adminRoute = require("./routes/userRoute.js");
const shopRoute = require("./routes/shopRoute.js");
const formRoute = require("./routes/formRoute.js");
const User      = require("./models/User.js");
const CookieParser = require("cookie-parser");

mongoose.connect("mongodb://localhost:27017/ourShop");

function MyMiddleWare(req, res, next){
    const cookie =typeof req.cookies == "string" ? JSON.parse( req.cookies) : req.cookies;
    
    if( cookie?.loginId ){
        const user = User.find(cookie.loginId);

        if( user ){
            req.user = user;
        }
    }
    next();
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());//default 
app.use(express.urlencoded());
app.use(CookieParser());
app.use(MyMiddleWare);
app.use("/admin", adminRoute);
app.use("/form", formRoute);
app.use("/product", shopRoute);


app.get("/", (req, res)=>{
    const query = req.query;
    res.render("base", query);
});

app.listen(port, hostname, ()=>{
    console.log(`Server Running on http://${hostname}:${port}`);
});

