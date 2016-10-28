var express = require('express');
var router = express.Router();

router.get('', function (req, res) {
    res.send('User-agent: *</br>Disallow: /secure-employee-referral-code.txt');
});

module.exports = router;