const express = require('express');
const router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/', function (req, res) {
    if (req.user) {
        res.redirect('/home')
    }
    res.render('index');
});

module.exports = router;