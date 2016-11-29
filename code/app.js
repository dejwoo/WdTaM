/**
 * Module dependencies.
 */

const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');

const upload = multer({dest: path.join(__dirname, 'uploads')});

/**
 * Controllers (route handlers).
 */

const homeController = require('./controllers/home');
const userController = require('./controllers/users');
const clientController = require('./controllers/client');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */

dotenv.load({path: '.env.settings'});

/**
 * Passport configuration.
 */

const Account = require('./models/account');
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

/**
 * Create Express server.
 */

const app = express();

/**
 * Connect to MongoDB.
 */

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    {user: process.env.MONGODB_USER, pass: process.env.MONGODB_PASS});
mongoose.connection.on('error', function () {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});


/**
 * Express configuration.
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    //store: new MongoStore({
    //    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    //    autoReconnect: true
    //})
}));
app.use(lusca({
    csrf: true,
    csp: {
        policy: {
            "default-src": "'self' dejwoo.com api.dejwoo.com",
            "image-src": "*",
            "style-src": "'self' fonts.googleapis.com cdnjs.cloudflare.com",
            "script-src": "'self' code.jquery.com cdnjs.cloudflare.com",
            "font-src": "'self' fonts.googleapis.com fonts.gstatic.com cdnjs.cloudflare.com"
        }
    },
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
    xssProtection: true,
    nosniff: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    if (req.path === '/api/upload') {
        next();
    } else {
        lusca.csrf()(req, res, next);
    }
});

app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.token = req.csrfToken();
    next();
});

app.use(function (req, res, next) {
    // After successful login, redirect back to the intended page
    if (!req.user &&
        req.path !== '/login' &&
        req.path !== '/register' && !req.path.match(/^\/auth/) && !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    } else if (req.user &&
        req.path == '/account') {
        req.session.returnTo = req.path;
    }
    next();
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


/**
 * Primary app routes.
 */

// app.use('/', homeController);
app.use('/', userController);
app.use('/client', clientController);
/*
 Disabled for testing

 app.post('/login', userController.postLogin);
 app.get('/logout', userController.logout);

 app.get('/register', userController.getRegister);
 app.post('/register', userController.postRegister);
 */

// TODO forgot routes
// app.get('/forgot', userController.getForgot);
// app.post('/forgot', userController.postForgot);
// TODO reset routes
// app.get('/reset/:token', userController.getReset);
// app.post('/reset/:token', userController.postReset);
// TODO contact routes
//app.get('/contact', contactController.getContact);
//app.post('/contact', contactController.postContact);
// TODO account routes
//app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
//app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
//app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
//app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
//app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * Error Handler.
 */

app.use(errorHandler());

module.exports = app;