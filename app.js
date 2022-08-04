const express = require("express");
const https = require('node:https');
const app = express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded());
app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
  const query= req.body.cityName;
  const appkey="";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+appkey;

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data) {

      const wData=JSON.parse(data);
      const temp=wData.main.temp;
      const weatherDes=wData.weather[0].description;
      const imgId=wData.weather[0].icon;
      const iconURL="http://openweathermap.org/img/wn/"+imgId+"@2x.png";
      res.write("<h1>The temperature in " +wData.name + " is "+ temp+" Celcius.</h1>");
      res.write( "<h1>The weather is currently "+ weatherDes + "</h1>");
      res.write("<img src="+iconURL+">");
      res.send();
    });
  });
});






app.listen(3000, function(){

  console.log("server is running");
});
