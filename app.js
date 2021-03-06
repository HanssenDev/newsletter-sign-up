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
       
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.email;

    const data = {
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/734d4df17c";

    const options = {
        method: "POST",
        auth: "hanssen7:a399601b0e3c24628e7599ef34ff34a9-us17"
    }
    
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendfile(__dirname + "/success.html")
        } else {
            res.sendfile(__dirname + "/failure.html")
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req, res) {
    res.redirect("/");
})


app.listen(3000 || process.env.PORT, function() {
    console.log("Server is running on port 3000");
});

