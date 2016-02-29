var express = require("express");
//var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "jade");
app.use("/estatico", express.static('public'))
app.get("/", function(req,res){
    res.render("index")
});
app.get("/login", function(req,res){
    res.render("login")
});

app.listen(80);