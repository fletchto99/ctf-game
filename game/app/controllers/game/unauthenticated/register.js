var express = require('express');
var router = express.Router();

var user = require('../../../models/game/user');

router.get('', function (req, res) {
    res.render('unauthenticated/register');
});

router.post('', function(req, res) {
    if (req.session.user) {
        res.render('unauthenticated/register', {
            error: "You must be logged out to register a new profile!"
        });
    } else if (req.body.employee_access_code != 'flag{welcome_to_the_game}') {
        res.render('unauthenticated/register', {
            error: "Invalid access code!"
        });
    } else {
        user.register(req.body).then(function (result) {
            console.log(result);
            req.session.user = result;
            res.redirect('/dashboard?page=dashboard');
        }, function (error) {
            res.render('unauthenticated/register', {
                error: error.error
            });
        });
    }
});

module.exports = router;