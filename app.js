const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to mongo db
mongoose.connect(config.database);

//On connect
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb from nodejs using mongoose ->'+config.database);
});

//On err
mongoose.connection.on('error', (err) => {
    console.log('Connection err'+err);
});

const app = express();

const users = require('./routes/users');

//port number
const port = 3000;

//cors middleware
app.use(cors());

//set client path
app.use(express.static(path.join(__dirname, 'public')));

//body parser-middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
//users route
app.use('/users',users);

//index route
app.get('/',(req,res) => {
    res.send('Invalid endpoint');
});

//start server
app.listen(port,() => {
    console.log('server started on port '+port);
});