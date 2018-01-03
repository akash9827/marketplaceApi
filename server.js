var express= require('express');
var app= express();
var bodyParser= require('body-parser');
var morgan= require('morgan');
var port= process.env.PORT||5022;
var request= require('request');
var FormData= require('form-data');
var fs= require('fs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(morgan('dev'));

var token="ae150148d9fe128b274f72e931ccc006e3f09ac33aa69e0b34165939c9da4a88";
var baseURL="https://api.smartrecruiters.com/v1";

require('./routes/routes.js')(app,token,baseURL,request,FormData,fs)

app.listen(port);
console.log("WEB SERVER ON PORT : "+ port);