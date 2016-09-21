var express = require('express');
var router = express.Router();

router.get('', function (req, res) {
    if (req.session.user) {
        res.redirect('/dashboard?page=dashboard');
    } else {
        res.render('unauthenticated/welcome');
    }

});

module.exports = router;