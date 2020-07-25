const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// Use a static folder to load static files
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
       
    let firstName = req.body.firstName;
    let secondName = req.body.secondName;
    let emailAddress = req.body.email;

    console.log(firstName, secondName, emailAddress);    
})



app.listen(3000, function() {
    console.log("Server is running on port 3000");
});