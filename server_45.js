'use strict'

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();



hbs.registerPartials(__dirname + '/views/partials');


hbs.registerHelper('getCurrentYear',()=>{ //hbs exposes the registerHelper and registerPartial method from handlebars.
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
  }
)

//----45---- log file
app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}:${req.method}${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    console.log('Unable to append to server.log');
  });
  next(); // the app will run, if there is a next();
});

//app.use((req,res,next)=>{ // use this method, when app is being maintenanced
  //res.render('maintenance.hbs');
  //next();
//});

app.use(express.static(__dirname + '/public'));
//------45--------


app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Andrew',
    likes: [
      'Biking',
      'Cities'
    ]
  });
});

//---------- 43----------------
//Using hbs as the default view engine requires just one line of code in your app setup. 
//This will render .hbs files when res.render is called.
app.set('view engine', 'hbs'); // set the template engine to view engine
app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome to my Aboutsite',

  }); // render replace  
});
app.get('/home',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',

  }); 
});
//---------- 43----------------


// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

const port = 3000;
app.listen(port,()=>{
  console.log('Server is uop on port:' + port);
});
