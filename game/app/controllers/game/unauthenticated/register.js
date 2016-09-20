var express = require('express');
var router = express.Router();

router.get('', function (req, res) {
    res.render('unauthenticated/register');
});

module.exports = router;