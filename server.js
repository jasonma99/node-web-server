const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //store the port we use for the app, the environment var; process.env is an object stores all of our environment vars as key var pairs
var app = express();  //__dirname store the file path to your project's directory

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');          //set some variuos express related configurations

app.use((req, res, next)=>{ //use next to tell express when the middleware is done; if we don't include next func in the use func, handlers after it will never gonna run
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`; //req.method: request method(GET method),
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if (err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));//third party middleware, don't have to manually configure it; http://localhost:3000/help.html; it is registering the middleware; it's setting up the express static directory

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res)=>{
  //res.send('<h1>hello express~</h1>');//register a handler for an http get request; first one is the url, second arg is what to send back, the func to run.
  // res.send({
  //   name:'Jason',
  //   likes: [
  //     'Alice',
  //     'lala'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello, welcome to Jason\'s website.'
  });
});

app.get('/about', (req,res)=>{
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle: 'About Page'
  }); //render any of the templates you have set up with your current view engine
});

app.get('/bad', (req,res)=>{
  //res.send('something wrong');
  res.send({
    errorMessage: "something wrong"
  });
});

app.listen(port, ()=>{ //do something once the page is up; optional
  console.log(`page up on port ${port}`);
}); //bind the app to the port of our machine
