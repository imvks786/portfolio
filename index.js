
const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const firebase = require('@firebase/app');
const admin = require('firebase-admin');


require('dotenv').config();
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
//const serviceAccount = require('./im-vks-firebase-adminsdk-eqwkh-532e5827d5.json');


const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("express"));
app.use(express.static(__dirname + '/public'));


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAErENpsTWdIXH6V7mfXlOZSGq4iuGvJ2A",
  authDomain: "im-vks.firebaseapp.com",
  databaseURL: "https://im-vks-default-rtdb.firebaseio.com",
  projectId: "im-vks",
  storageBucket: "im-vks.appspot.com",
  messagingSenderId: "891861302410",
  appId: "1:891861302410:web:970425c98ac48ccc878173",
  measurementId: "G-GY2NWBE2GT"
};
firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://im-vks-default-rtdb.firebaseio.com' // Replace with your database URL
});
  
const database = admin.database();


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
    const { yourname, email,msg } = req.body;

    // Push data to Firebase
    const dataRef = database.ref('formData'); // 'formData' is the name of your data collection
    const newDataRef = dataRef.push();
    newDataRef.set({
      name: yourname,
      email: email,
      message: msg
    });
  
    res.render('success');
});





const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);