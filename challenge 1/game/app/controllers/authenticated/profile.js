const user = require('../../models/user');

module.exports = {
    get(req, res) {
        res.render('authenticated/profile');
    },
    post(req, res) {
        req.body.user_id = req.session.user.user_id;
        if (req.session.user.admin_session || (req.cookies['admin_cookie'] && req.session.admin_cookie && req.cookies['admin_cookie'] == req.session.admin_cookie)) {
            req.body.admin = true;
        }
        user.updateProfile(req.body).then(function () {
            if (req.cookies['admin_cookie']) {
                req.session.destroy();
            }
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