var database = require('../database');

module.exports = function (req, res, next) {
    if (!req.session || !req.session.user) {
        res.status(401).json({
            error: 'You are not authorized to access this page!'
        })
    } else {
        next();
    }
};