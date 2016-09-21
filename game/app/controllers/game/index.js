var express = require('express');
var router = express.Router();


router.use('/robots.txt', require('./unauthenticated/robots'));
router.use('/secure-employee-referral-code.txt', require('./unauthenticated/refferal-codes'));
router.use('/register', require('./unauthenticated/register'));
router.use('/login', require('./unauthenticated/login'));
router.use('/', require('./unauthenticated/welcome'));

router.get('/dashboard', function (request, response) {
    console.log(request.query.page);
    if (request.query.page == 'dashboard') {
        require('./authenticated/dashboard')(request, response);
    } else if (request.query.page == 'profile') {
        require('./authenticated/profile')(request, response);
    } else if (request.query.page == 'messenger') {
        require('./authenticated/messenger')(request, response);
    } else if (request.query.page == 'logout') {
        require('./authenticated/logout')(request, response);
    } else {
        require('./authenticated/lfi-exploit')(request, response);
    }
});

module.exports = router;