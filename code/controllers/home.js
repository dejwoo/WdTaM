const express = require('express');
const router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/', function (req, res) {
    if (req.user) {
    	if (req.user.isMechanic) {
	        res.redirect('/home')
    	}
	    else {
	    	res.redirect('/client/home')
	    }
    }else{
        res.render('index');
	}
});

module.exports = router;