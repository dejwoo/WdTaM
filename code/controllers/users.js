const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const express = require('express');
const passport = require('passport');
const router = express.Router();

const Account = require('../models/account');
const Ticket = require('../models/ticket');
const Status = require('../models/status');
module.exports = function (io) {
    router.get('/', function (req, res) {
        if (req.user) {
            if (req.user.isMechanic) {
                res.redirect('/home');
            }
            else {
                res.redirect('/client/home');
            }
        } else {
            res.render('index');
        }
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
            res.redirect(req.session.returnTo || "/");
        } else {
            res.render('account/login', {user: req.user, title: "Login"});
        }
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
            //save last login date
            Account.findOneAndUpdate({'username': req.body.username}, {lastLogin: Date.now()}, {new: true}, function (err, user) {
                if (err) {
                    console.log(err);
                }
            });
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect(req.session.returnTo || "/");
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

    router.get('/help', function (req, res) {
        res.render('help');
    });

    router.get('/about', function (req, res) {
        res.render('about');
    });

    router.get('/jobs', function (req, res) {
        res.render('jobs');
    });

    router.get('/support', function (req, res) {
        res.render('support');
    });
    router.get('/contact', function (req, res) {
        res.render('contact');
    });


    router.get('/settings', isAuthenticated, function (req, res) {
        if (req.user) {
            res.render('account/settings', {title: 'Settings', user: req.user});
        } else {
            res.redirect('/')
        }
    });


    function isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.session.returnTo = req.path;
        }
        res.redirect('/login');
    }

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    router.get('/tickets', isAuthenticated, function (req, res) {
        function logError(err, data) {
            if (err) console.error(err);
            //return console.log(data);
        }

        /*Account.findOne({'username': 'dejwoo'}, logError).then((user)=>{
             Account.findOne({'username': 'mechanic'}, logError).then((mechanic)=>{
                 Status.findOne({'name': 'New'}, logError).then((status)=>{
                 let md = {
                 author: user._id,
                 items: [],
                 subject: messages[0].title,
                 text: messages[0].messageContent,
                 images: messages[0].images
                 };
                 let td = {
                 user: user._id,
                 mechanic: mechanic._id,
                 messages: [],
                 status: status._id,
                 title: "Car problem",
                 vehicle: null,
                 templates: [],
                 additionalInfo: [],
                 };
                 Ticket.createTicket(td,md, logError);
                 });
             });
         });*/


        if (req.user.isMechanic) {
            let stateList = [];
            const statesCursor = Status.find().cursor();
            statesCursor.on('data', (doc) => stateList.push(doc.name));
            statesCursor.on('end', () => res.render('mechanic/tickets', {
                title: 'Tickets',
                states: stateList,
            }));
        } else {
            res.redirect('/')
        }
    });
    const moment = require('moment');
    io.of('/tickets').on('connection', function (socket) {

        socket.on('tickets/startLoad', function (query) {
            let cursor = Ticket.find(query).cursor();
            cursor.on('data', (doc) => {
                let formatted = {};
                formatted.updated_date = moment(doc.updated_date);
                socket.emit('tickets/newTicket', doc, formatted)
            });
            cursor.on('end', () => socket.emit('tickets/endLoad'));
        });

        socket.on('disconnect', function () {
            console.log('A User disconnected');
        });
    });

    router.get('/ticket-detail', isAuthenticated, function (req, res) {
        if (req.user.isMechanic) {
            Ticket.find({_id: req.query.id})
                .populate('user')
                .populate('mechanic')
                .populate('messages')
                .populate('status')
                .exec((err, ticket) => {
                console.log(ticket);
                    res.render('mechanic/ticket-detail',
                        {title: 'Tickets', ticket: ticket, ticketId: 1});
                });
            //FIXME ticketId is redundant and is just there for static data until messages can be retrieved from DB
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

    router.get('/stats', isAuthenticated, function (req, res) {
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
    return router;
};