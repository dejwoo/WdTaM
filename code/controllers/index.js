var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
	res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
	res.render('register', { });
});

router.post('/register', function(req, res) {
	Account.register(new Account({ username : req.body.username, email:req.body.email, firstName:req.body.firstName, lastName:req.body.lastName, isMechanic:req.body.isMechanic }), req.body.password, function(err, account) {
		if (err) {
			return res.render('register', { account : account });
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

router.get('/login', function(req, res) {
	res.render('login', { user : req.user });
});

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		//nastala chyba
		if (err) { return next(err); }
		//nepodarilo sa authentifikovat
		if (!user) { return res.render('login', { reason:info }); }
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			res.redirect('/');
		});
	})(req, res, next);
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/ping', function(req, res){
	res.status(200).send("pong!");
});

module.exports = router;