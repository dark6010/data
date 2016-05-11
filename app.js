var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");

var app = express();

app.use("/public", express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "123bgh54ss6ed",
    resave: false,
    saveUninitialized: false
}));
// resave en true permite modificar
// saveUninitialilized
app.set("view engine", "jade");

app.get("/", function(req,res){
    console.log(req.session.user_id);
    res.render("index");
});
app.get("/signup", function(req,res){
    User.find(function(err,doc){
        console.log(doc);
        res.render("signup");
    })
});
app.get("/login", function(req,res){
    res.render("login");
});
app.post("/users", function(req, res){
    //console.log("contrase;a: "+req.body.password);
    //console.log("email: "+req.body.email);
    var user = new User({
        email: req.body.email, 
        password:req.body.password,
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
                        });
    user.save().then(function(us){
        res.send("guardamos el usuario exitosamente");
    }, function(err){
        console.log(String(err));
        res.send("no pudimos guardar los datos");
        
    });
});

app.post("/sessions", function(req, res){
    User.findOne({email:req.body.email, password: req.body.password}, function(err, user){
        req.session.user_id = user._id;
        res.send("hola mundo");
    });
});

app.use("/app", session_middleware);
app.use("/app", router_app);
app.listen(80);