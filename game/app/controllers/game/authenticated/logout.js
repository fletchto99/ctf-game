var express = require('express');
var router = express.Router();

router.get('/', function (request, res) {
    request.session.destroy(function (error) {
        if (!error) {
            res.json({
                status: 'Success!'
            })
        } else {
            res.jsonError({
                dev_error: error,
                status: 'Error logging out!'
            }, 500);
        }

    });
});

module.exports = router;