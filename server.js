// Dependencies

var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var router = require("./controllers/burger_controller.js");
var path = require("path");
//ENABLE if you want to use your own local environmental variables.
require("dotenv").config();

const express = require('express'),
			app = express(),
			PORT = 3000


// Middleware
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set up rendering engine, Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static files and routes (middleware)
app.use(express.static(__dirname + "/public"));
app.use("/", router);

/*
// Timeout
app.use(timeout(15000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}

*/

// Start server
app.listen(PORT, function(){
	console.log("Listening on" + PORT);
  });

