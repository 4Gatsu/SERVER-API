const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
// next
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res){
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "ca40638e1c010da5e97af00ac87d2170";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    console.log(weatherDescription);
    res.write("<p>the temp in " + query + " is " + temp + " Celcius</p>");
    res.write("<h1>it is " + weatherDescription + "<h1>");
    res.write("<img src=" + imageURL + ">")
    res.send()
      })
  })
})





app.listen(3000, function(){
  console.log("Server is running on port 3000.")
});
