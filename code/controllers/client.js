const express = require('express');
const router = express.Router();
const passport = require('passport');
const Vehicle = require('../models/vehicle');
const Template = require('../models/problem_template');

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.session.returnTo = "/client" + req.path;
	}
	res.redirect('/login');
}

module.exports = function(io) {
	var socketsDetails = {};
	io.on('connection', function(socket){
	    console.log('A user connected ' + socket.id);
	    socket.on("disconnect", function () {
	        console.log("A user disconnected " + socket.id)
	    });
	    socket.on("socketInfo", function(data){
	        console.log("SockInfoData", data);
	        if (data.username && data.userId && data.socketId) {
	        	socketsDetails[data.userId] = {username:data.username, sockedId:data.socketId};
	        }
	    });
	});

	function sendUser(req, res, next) {
		console.log(0);
		res.on('finish', function() {
			console.log(socketsDetails,req.user.toObject()._id.toString('utf8'));
			if (req.user._id && socketsDetails && socketsDetails[req.user._id]) {
				console.log(2);
				io.to(socketsDetails[req.user._id].sockedId).emit("contectedUser", JSON.stringify(req.user.toObject()));
			}
		});
		return next();
	}
	router.get('/home', isAuthenticated, sendUser, function(req, res) {
		if (req.user.isMechanic) {
			res.redirect('/home');
		} else {
			res.render('client/home', {
				title: 'Home'
			});
		}
	});
	router.get('/vehicles/:page', isAuthenticated, function(req, res) {
		if (req.user.isMechanic) {
			res.redirect('/home');
		}

		// default
		if (!req.params.page) {
			req.params.page = 1
		}
		// default
		if (!req.query.perPage) {
			req.query.perPage = 3
		}

		//treba vybrat vsetky auta
		var cursor = Vehicle.find({
			owner: req.user._id
		}).cursor();
		var vehicleArray = [];
		cursor.on('data', function(doc) {
			// Called once for every document
			vehicleArray.push(doc);
		});
		cursor.on('end', function() {
			if (req.params.page == "latest") {
				res.render('client/vehicles', {
					title: 'Vehicles',
					vehicles: vehicleArray,
					page: Math.floor(vehicleArray.length / req.query.perPage) + 1,
					pagesTotal: Math.floor(vehicleArray.length / req.query.perPage) + 1,
					perPage: parseInt(req.query.perPage)
				});
			} else {
				res.render('client/vehicles', {
					title: 'Vehicles',
					vehicles: vehicleArray,
					page: parseInt(req.params.page),
					pagesTotal: Math.floor(vehicleArray.length / req.query.perPage) + 1,
					perPage: parseInt(req.query.perPage)
				});
			}
		});
	});

	router.get('/vehicle/add', isAuthenticated, function(req, res) {
		if (req.user.isMechanic) {
			res.redirect('/home');
		}
		io.on('connection', function(socket) {
			socket.emit("contectedUser", req.user);
		});

		res.render('client/vehicle_add', {
			title: 'Add vehicle'
		});
	});

	router.post('/vehicle/add', isAuthenticated, function(req, res) {
		if (req.user.isMechanic) {
			res.redirect('/home');
		}
		io.on('connection', function(socket) {
			socket.emit("contectedUser", req.user);
		});

		(new Vehicle({
			name: req.body.name,
			model: req.body.model,
			type: req.body.type,
			owner: res.locals.user._id,
			ecv: req.body.ecv,
			vin: req.body.vin
		})).save(function(err, vehicle) {
			if (err) {
				console.err(err);
				return res.render('client/vehicle_add', {
					vehicle: vehicle,
					title: "Register"
				});
			}
			res.redirect('/client/vehicles/latest');
		});
	});

	router.get('/problem/add', isAuthenticated, function(req, res) {
		if (req.user.isMechanic) {
			res.redirect('/home');
		}
		//treba vybrat vsetky auta
		var cursor = Vehicle.find({
			owner: req.user._id
		}).cursor();
		var vehicleArray = [];
		cursor.on('data', function(doc) {
			// Called once for every document
			vehicleArray.push(doc);
		});
		cursor.on('end', function() {
			res.render('client/problem_add', {
				title: 'Add problem',
				vehicles: vehicleArray,
				currentLevel: 0,
				loadClientAddProblemJs: true
			});
		});
	});
	return router;
}