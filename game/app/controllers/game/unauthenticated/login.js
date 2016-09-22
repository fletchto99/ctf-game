var express = require('express');
var router = express.Router();

var user = require('../../../models/game/user');

router.get('', function (req, res) {
    res.render('unauthenticated/login');
});

router.post('', function (req, res) {
    if (req.session.user != null) {
        res.redirect('/dashboard?page=dashboard')
    } else {
        user.authenticate(req.body).then(function (result) {
            req.session.user = result;
            console.log(req.session.user);
            res.redirect('/dashboard?page=dashboard')
        }, function (error) {
            res.render('unauthenticated/login', {
                error: error.error
            })
        });
    }
});

module.exports = router;