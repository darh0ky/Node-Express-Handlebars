// Dependencies

var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var router = require("./controllers/burger_controller.js");
var path = require("path");

// Express setup
var app = express();
var PORT = process.env.PORT || 3002;


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

// Timeout
app.use(timeout(15000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}
// Start server
app.listen(PORT, function() {
	console.log("Listening on PORT " + PORT);
});