const express = require('express');
const router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/', function (req, res) {
    res.render('index', {title: 'Home'});
});

module.exports = router;