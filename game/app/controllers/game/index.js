var express = require('express');
var router = express.Router();

/**
 * Open API endpoints
 */
router.use('/robots.txt', require('./unauthenticated/robots'));
router.use('/secure-employee-referral-code.txt', require('./unauthenticated/robots'));
router.use('/register', require('./unauthenticated/register'));
router.use('/login', require('./unauthenticated/login'));
router.use('/', require('./unauthenticated/welcome'));

router.get('/dashboard', function (request, response, next) {
    if (request.query.page == 'dashboard') {
        router.use('/dashboard', require('./authenticated/dashboard'))
    } else if (request.query.page == 'profile') {
        router.use('/dashboard', require('./authenticated/profile'))
    } else if (request.query.page == 'messenger') {
        router.use('/dashboard', require('./authenticated/messenger'))
    } else if (request.query.page == 'messenger') {
        router.use('/dashboard', require('./authenticated/logout'))
    } else {
        router.use('/dashboard', require('./authenticated/lfi-exploit'))
    }
    next();
});

module.exports = router;