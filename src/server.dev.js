/****
* Job Seeker Or Event Site Server
*/
import express from 'express';
import path from 'path';
var cookieParser = require('cookie-parser')

import renderOnServer from './renderOnServer'
var webpack = require("webpack")
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpackCompiler = require("../webpack.config.js")
import config from "../config/config.js"
import helmet from 'helmet'

const APP_PORT = config.EXPRESS_SERVER_PORT;

var app = express();

//Security Options
//app.disable('x-powered-by')
//app.use(helmet())


// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());

/*#######################################################################
* SETTING WEBPACK COMPILER AND BUNDLE IT WITH EXPRESS
*/

// Dev Mode Settings Goes Here

  //Setting Webpack compiler
  var compiler = webpack(webpackCompiler);
  //configuring webpack server structure
  var webpackDevServerMiddleWare = webpackDevMiddleware(compiler, {
    stats: {colors: true},
    noInfo: true,
    inline: true,
    hot: true,
  });

  //configuring Weboack hot middle ware
  var hotMiddleWare = webpackHotMiddleware(compiler);

  //add webpack middlewares to express Server
  app.use(webpackDevServerMiddleWare);
  app.use(hotMiddleWare);

// Serve CSS
//app.use('/css/', express.static(path.resolve(__dirname, '..', 'css')));

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
  //var cookies = res.req.headers.cookie;  //cookie: 'omega=14b346fd80541941_5833ec76.XTFV_eQ0z7zQIkXZsXB7ebVCXNE; _gat=1; _ga=GA1.1.2105941661.1479797484',
    renderOnServer(req, res, next);
});



app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});
