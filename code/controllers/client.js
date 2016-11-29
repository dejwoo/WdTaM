const express = require('express');
const router = express.Router();
const passport = require('passport');
const Vehicle = require('../models/vehicle');

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

router.get('/home', isAuthenticated, function (req, res) {
	if (req.user.isMechanic) {
		res.redirect('/home');
	} else {
		res.render('client/home', {title: 'Home'});
	}
});
router.get('/vehicles', isAuthenticated, function (req, res) {
	if (req.user.isMechanic) {
		res.redirect('/home');
	}
	//treba vybrat vsetky auta
	var cursor = Vehicle.find({owner:req.user._id}).cursor();
	var vehicleArray = [];
	cursor.on('data', function(doc) {
  		// Called once for every document
  		vechicleArray.push(doc);
	});
	cursor.on('close', function() {
  		res.render('client/vehicles', {title: 'Vehicles', vehicles:vehicleArray });
	});
});
router.post('/vehicles', isAuthenticated, function (req, res) {
	if (req.user.isMechanic) {
		res.send("Tu by mal byt mechanic");
	} else {
		res.render('client/home', {title: 'Home'});
	}
});



module.exports = router;