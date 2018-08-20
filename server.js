const express = require('express');

var app = express();


app.get('/', (req, res)=>{
  //res.send('<h1>hello express~</h1>');//register a handler for an http get request; first one is the url, second arg is what to send back, the func to run.
  res.send({
    name:'Jason',
    likes: [
      'Alice',
      'lala'
    ]
  });
});

app.get('/about', (req,res)=>{
  res.send('About Page');
});

app.get('/bad', (req,res)=>{
  //res.send('something wrong');
  res.send({
    errorMessage: "something wrong"
  });
});

app.listen(3000); //bind the app to the port of our machine
