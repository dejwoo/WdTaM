const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

router.get('/', function (req, res) {
    if (req.user) {
        if (req.user.isMechanic) {
            res.redirect('/home');
        }
        else {
            res.redirect('/client/home');
        }
    }
    res.render('index');
});

router.get('/home', isAuthenticated, function (req, res) {
    if (req.user.isMechanic) {
        res.render('mechanic/home', {title: 'Home'});
    } else {
        res.redirect('/client/home')
    }
});


router.get('/login', function (req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/login', {user: req.user, title: "Login"});
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        //nastala chyba
        if (err) {
            return next(err);
        }
        //nepodarilo sa authentifikovat
        if (!user) {
            return res.render('account/login', {reason: info, title: "Login"});
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/home')
        });
    })(req, res, next);
});

router.get('/register', function (req, res) {
    res.render('account/register', {title: "Register"});
});

router.post('/register', function (req, res) {
    Account.register(new Account({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isMechanic: req.body.isMechanic
    }), req.body.password, function (err, account) {
        if (err) {
            return res.render('account/register', {account: account, title: "Register"});
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/tickets', isAuthenticated, function (req, res) {
    if (req.user.isMechanic) {
        res.render('mechanic/tickets', {title: 'Tickets'});
    } else {
        res.redirect('/')
    }
});
router.get('/ticket-detail', isAuthenticated, function (req, res) {
    if (req.user.isMechanic) {
        res.render('mechanic/ticket-detail', {title: 'Tickets'});
    } else {
        res.redirect('/')
    }
});

router.get('/clients', isAuthenticated, function (req, res) {
    if (req.user.isMechanic) {
        res.render('mechanic/clients', {title: 'Clients'});
    } else {
        res.redirect('/')
    }
});

router.get('/statistics', isAuthenticated, function (req, res) {
    if (req.user.isMechanic) {
        res.render('mechanic/statistics', {title: 'Statistics'});
    } else {
        res.redirect('/')
    }
});

router.get('/td', isAuthenticated, function (req, res) {
    if (req.user.isMechanic) {
        res.render('mechanic/ticket-detail', {title: 'Statistics'});
    } else {
        res.redirect('/')
    }
});


module.exports = router;