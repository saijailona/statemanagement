'use strict';
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const username = 'foo';
const password = 'bar';

app.use(cookieParser());
app.use(session({secret: 'ihsma', cookie:{maxAge: 6000}}));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
})

app.get('/secret', (req, res) => {
  if(req.session.logged){
    res.render('secret');
  } else {
    res.redirect('/form');
  }
});

app.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.password === password && req.body.username === username) {
    req.session.logged = true;
    res.redirect('/secret');
  } else {
    req.session.logged = false;
    res.redirect('/form');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr).send('Eväste asetettu');
});

app.get('/getCookie', (req, res) => {
  console.log(req.cookies);
  res.send('Color evästeessä lukee' + req.cookies.color);
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('Eväste poistettu');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
