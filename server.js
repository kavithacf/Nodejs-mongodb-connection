var express = require('express');
var app = express();
var port = 3000;//port

var bodyParser = require('body-parser');//pass data to server
app.use(bodyParser.json());//convert to json formart
app.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require("mongoose");//database connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/company");


var nameSchema = new mongoose.Schema({//userSchema
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  password: String
});
var User = mongoose.model("User", nameSchema);// create model

app.post("/addcompany", (req, res) => {//post api for user 
  var myData = new User(req.body);
  //callback
  myData.save( (err,val) => {
  		if(err){
      res.status(400).send("unable to save to database");
  		}
  		else{
  		console.log(val);

  		}
  });

  //promise
  myData.save()
    .then(item => {
    	console.log(item);
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

app.get('/getusers', function(req, res) {
    console.log("working");

    User.find({}, function (err, data) {
        if (err)
            res.status(400).send(err);
        res.status(200).send(data);
    });
});







app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");//redirect to index page
});

app.listen(port ,() => {
	console.log("App listing on the port 3000");//listening to port 

});


