const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

router.get('/login', function (req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('account/login', {user: req.user});
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        //nastala chyba
        if (err) {
            return next(err);
        }
        //nepodarilo sa authentifikovat
        if (!user) {
            return res.render('account/login', {reason: info});
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    })(req, res, next);
});

router.get('/register', function (req, res) {
    res.render('account/register', {});
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
            return res.render('account/register', {account: account});
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

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;