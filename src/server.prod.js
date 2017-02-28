/****
* Job Seeker Or Event Site Server
*/
import express from 'express';
import path from 'path';
var cookieParser = require('cookie-parser')

import renderOnServer from './renderOnServer'
import config from "../config/config.js"
var compression = require('compression')
import helmet from 'helmet'

const APP_PORT = config.EXPRESS_SERVER_PORT;

var app = express();

//Security Options
//app.use(helmet())

//Compress
app.use(compression())

// Set Public or static asset folder
app.use('/assets/', express.static(path.resolve(__dirname, '..', 'public')));

// Serve Images
app.use('/images/', express.static(path.resolve(__dirname, '..', 'public', "images")));


// Serve JavaScript
app.get('/app.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile('app.js', {root: __dirname});
});

// Serve HTML
app.get('/*', (req, res, next) => {
    renderOnServer(req, res, next);
});

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());


app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});
