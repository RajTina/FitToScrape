var express = require("express");
// var logger = require("morgan");
var mongoose = require("mongoose");
var expressHandlebars = require ("express-handlebars");
var bodyParser = require ("body-parser");
var PORT = process.env.PORT || 3000;

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// // Require all models
// var db = require("./models");

// var PORT = 3000;

// Initialize Express
var app = express();
var router = express.Router()
//require our routs file pass our routs object
require ("./config/routes")(router);
app.use(express.static(__dirname + "/public"));

// connect Handlebars to our Express app
app.engine("handlebars",expressHandlebars ({
    defaultLayout: "main"
}));
app.set ("view engine", "handlebars");

// use bodyParser in our app
app.use (bodyParser.urlencoded({
    extended:false
}));

app.use (router);
// if deployed, use the deployed database, otherwise use router middleware
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// connect mongoose to our database
mongoose.connect(db, function(error){
    // log any errors connecting with mongoose
    if (error){
        console.log(error);
    }
    // or log to a success message
    else{
        console.log("mongoose connection is successful");
    }
});
//listen on the port
app.listen(PORT, function (){
    console.log("listening on port:" + PORT)
});

