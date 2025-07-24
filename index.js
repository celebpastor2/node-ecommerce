const express = require("express");
const app      = express();
const path     = require("path");
const port      = 5000;
const hostname = "localhost";
const mongoose = require("mongoose");
const adminRoute = require("./routes/userRoute.js");
const shopRoute = require("./routes/shopRoute.js");
const formRoute = require("./routes/formRoute.js");

mongoose.connect("mongodb://localhost:27017/ourShop");

function MyMiddleWare(req, res, next){
    next();
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());//default 
app.use(express.urlencoded());
app.use(MyMiddleWare);
app.use("/admin/:user_id", adminRoute);
app.use("/form", formRoute);
app.use("/product", shopRoute);


app.get("/", (req, res)=>{
    const query = req.query;
    res.render("base", query);
});

app.get('/login', (req, res)=>{
    const variable = ["one", "two", "three", "four", "five"];
    res.render("login", {
        arr_guard:variable
    });
});
app.listen(port, hostname, ()=>{
    console.log(`Server Running on http://${hostname}:${port}`);
});

