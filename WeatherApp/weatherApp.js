const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const apiKey = "1032372b27eef9526603a11ec7f374da";
    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const cityName = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity;
            const iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<h1>City: " + cityName + "</h1>");
            res.write("<img src="+iconUrl+" alt=\"weather icon\">");
            res.write("<h2>Temperature: "+ temp + " deg. celcius</h2>");
            res.write("<h3>Weather description: " + description +".</h3>");
            res.write("<h3>Humidity: " + humidity + "</h3>");
            res.send();
        });
    });
});


app.listen(3000, function(){
    console.log("Port is running on port 3000.");
});