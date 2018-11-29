const express = require('express');
const hbs = require('hbs');

var app = express();

//using middleware, static take the absolute path that you want serve, __dirname is directory of your path
//http://localhost:3000/help.html

hbs.registerPartials(__dirname +'/views/partials');

app.set('view engine', 'hbs'); //set view engine

app.use(express.static(__dirname + '/public ')); 

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
/*   res.send({
    name: 'Andrew',
    likes: [
      'Biking',
      'Cities'
    ]
  }); */
  res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
        currentYear: new Date()
    });
});

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs',{
      pageTitle: 'About Page',
      currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});