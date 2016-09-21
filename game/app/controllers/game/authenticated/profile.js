const user = require('../../../models/game/user');

module.exports = {
    get(req, res) {
        res.render('authenticated/profile');
    },
    post(req, res) {
        req.body.user_id = req.session.user.user_id;
        user.updateProfile(req.body).then(function () {
            res.render('authenticated/profile', {
                error: "Profile successfully updated"
            })
        }, function (error) {
            res.render('authenticated/profile', {
                error: error.error
            })
        });

    }
};