var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fotos");
var user_schema = new mongoose.Schema({
    name: String,
    last_name: String,
    username: {
        type: String, 
        required:true, 
        maxlength:[50, "muy grande"]
    },
    password: {
        type: String, 
        minlength:[5,"muy corto"],
        validate: {
            validator: function(p){
                return this.password_confirmation == p;
            },
            message: "las contrase;as no son iguales"
        }
    },
    age: {
        type: Number, 
        min:[5, "la edad no puede ser menor de 5"], 
        max:[100, "la edad no puede ser mayor a 100"]
    },
    email: {
        type: String, 
        required:"el coreo es obligatorio", 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "coloca un email valido"]
    },
    //email: {type: String, required:true},
    date_of_birth: Date,
    sex: {
        type: String, 
        enum:{
            values: ["M","F"], 
            message:"opcion no valida"}
    }
});

user_schema.virtual("password_confirmation").get(function(){
    return this.p_c
}).set(function(password){
    this.p_c = password
})

//siempre en singular pero lo hace plural
var User = mongoose.model("User", user_schema);
module.exports.User = User;
/*
    String
    Number
    Date
    Buffer
    Boolean
    Mixed
    ObjectId
    Array
*/