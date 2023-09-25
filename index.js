const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("express"));
app.use(express.static(__dirname + '/public'));

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('imvks.sqlite');

// Create a table (if it doesn't exist)
db.run(`CREATE TABLE IF NOT EXISTS formData (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,email TEXT,msg TEXT)`);


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

app.get('/success', (req, res) => {
    res.render('success');
});


//Handle form submissions
app.post('/submit', (req, res) => {
    // try {
    //   const formData = req.body;
    //   fs.writeFileSync('formData.json', JSON.stringify(formData, null, 2));
    //   //res.send('Form data saved successfully!');
    //   res.render('success');
    // } catch (error) {
    //   res.status(500).send('Error saving form data.');
    // }
    const { yourname, email,msg } = req.body;
    db.run('INSERT INTO formData (name, email,msg) VALUES (?, ?, ?)', [yourname, email, msg], (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.render('success');
    });
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});



const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);