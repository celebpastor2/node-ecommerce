const express = require("express");
const app      = express();
const path     = require("path");
const port      = 5000;
const hostname = "localhost";
const mongoose = require("mongoose");
const adminRoute = require("./routes/userRoute");
const shopRoute = require("./routes/shopRoute");
const formRoute = require("./routes/formRoute");

mongoose.connect("mongodb://localhost:27017/ourShop", ()=>{
    console.log("Database Connected Successfully");

});


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded());

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

