global.__base = __dirname+"/../";
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const env = require('dotenv');
const app = express();

env.config({path: __base+"config/.env"});
env.load();

app.use(morgan("common")); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true  })); 

app.get('/', function(req, res){
	  res.sendFile(path.join(__base + '/public/index.html'));

});

app.listen(/*process.env.PORT*/process.env.PORT, function () {
	  console.log(`Listening on port ${process.env.PORT}!`);

});
