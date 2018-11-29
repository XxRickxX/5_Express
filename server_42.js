const express = require('express');

var app = express();

app. use(express.static(__dirname + '/public')); // __dirname : Directory name ; Can visit the website http://localhost:3000/help.html

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

app.get('/about', (req, res) => {
  res.send('About Page');
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


app.listen(3000,()=>{ 
  console.log('Server is uop on port 3000');  //callback function
});
