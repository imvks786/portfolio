const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static("express"));
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Home Page' });
});

app.get('/home', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/projects', (req, res) => {
    res.render('projects');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);