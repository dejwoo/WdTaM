const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const express = require('express');
const passport = require('passport');
const router = express.Router();

const Account = require('../models/account');
const Status = require('../models/status');

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

router.get('/help', function(req, res){
    res.render('help');
});

router.get('/about', function(req, res){
    res.render('about');
});

router.get('/jobs', function(req, res){
    res.render('jobs');
});

router.get('/support', function(req, res){
    res.render('support');
});
router.get('/contact', function(req, res){
    res.render('contact');
});


router.get('/settings', isAuthenticated, function (req, res) {
    if (req.user) {
        res.render('account/settings', {title: 'Settings', user:req.user});
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
    const moment = require('moment');
    let temp_date = moment(new Date('1.12.2016'));
    let tickets = [
        {name:'Jozo',title:'Critical car malfunction',messages:[{subject: "Re:Re:Tckt1",creation_date:temp_date.subtract(1,'day')}],id:0, status:{name:'Pending Customer', rank:2}},
        {name:'John',title:'Critical car malfunction',messages:[{subject: "Re:Tckt8",creation_date:temp_date.subtract(5,'day')}],id:1, status:{name:'In Progress', rank:3}},
        {name:'Jake',title:'Critical car malfunction',messages:[{subject: "Re:Re:Re:Tckt3",creation_date:temp_date.subtract(2,'day')}],id:2, status:{name:'Pending Maintenance', rank:2}},
        {name:'Jenny',title:'Critical car malfunction',messages:[{subject: "Re:Re:Tckt6",creation_date:temp_date.subtract(33,'day')}],id:3, status:{name:'Closed', rank:2}},
        {name:'Julien',title:'Critical car malfunction',messages:[{subject: "Re:Re:Re:Re:Tckt4",creation_date:temp_date.subtract(9,'day')}],id:4, status:{name:'Solved', rank:2}},
        {name:'James',title:'Critical car malfunction',messages:[{subject: "Re:Re:Tckt5",creation_date:temp_date.subtract(11,'day')}],id:5, status:{name:'Pending Vendor', rank:2}},
        {name:'Jano',title:'Minor car malfunction',messages:[{subject: "Tckt1",creation_date:temp_date.subtract(0,'day')}],id:6, status:{name:'New', rank:4}},
        {name:'Jano',title:'Minor car malfunction',messages:[{subject: "Tckt1",creation_date:temp_date.subtract(0,'day')}],id:7, status:{name:'New', rank:4}},
        {name:'Jano',title:'Minor car malfunction',messages:[{subject: "Tckt1",creation_date:temp_date.subtract(0,'day')}],id:8, status:{name:'New', rank:4}},
        {name:'Jano',title:'Minor car malfunction',messages:[{subject: "Tckt1",creation_date:temp_date.subtract(0,'day')}],id:9, status:{name:'New', rank:4}},
        {name:'Jano',title:'Minor car malfunction',messages:[{subject: "Tckt1",creation_date:temp_date.subtract(0,'day')}],id:10, status:{name:'New', rank:4}},
        {name:'Jano',title:'Minor car malfunction',messages:[{subject: "Tckt1",creation_date:temp_date.subtract(0,'day')}],id:11, status:{name:'New', rank:4}},
        {name:'Jano',title:'Minor car malfunction',messages:[{subject: "Tckt1",creation_date:temp_date.subtract(0,'day')}],id:12, status:{name:'New', rank:4}},
        {name:'Jano',title:'Minor car malfunction',messages:[{subject: "Tckt1",creation_date:temp_date.subtract(0,'day')}],id:13, status:{name:'New', rank:4}},
        {name:'Jano',title:'Minor car malfunction',messages:[{subject: "Tckt1",creation_date:temp_date.subtract(0,'day')}],id:14, status:{name:'New', rank:4}}
    ];
    if (req.user.isMechanic) {
        let stateList = [];
        const cursor = Status.find().cursor();
        cursor.on('data', (doc) => stateList.push(doc.name));
        cursor.on('end', () => res.render('mechanic/tickets', {title: 'Tickets', states: stateList, tickets:tickets}));
    } else {
        res.redirect('/')
    }
});
router.get('/ticket-detail', isAuthenticated, function (req, res) {
    if (req.user.isMechanic) {
        res.render('mechanic/ticket-detail', {title: 'Tickets', ticketId:req.query.id});
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
module.exports = router;