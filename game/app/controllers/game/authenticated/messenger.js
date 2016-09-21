var webshot = require('webshot');

module.exports = {
    get(req, res) {
        res.render('authenticated/messenger');
    },
    post(req, res) {
        if (!req.body.message || !req.body.to) {
            res.render('authenticated/messenger', {
                message: "Error sending message, please make sure to fill out a message and a recipient"
            });
        } else if (req.body.to == req.session.user.admin_username) {
            //Prevent dumping document.cookie -- this is a CSRF challenge
            req.body.message = req.body.message.split("document.cookie").join('"NICE TRY -- MY BOT IS NOT GONNA GIVE YOU MY COOKIE"');

            //TODO - Auto generate cookie then save it to session
            //When checking the update profile check for the presence of the admin cookie & ctf-game
            //cookie and check that the admin cookie matches that of the ctf-game cookie
            req.session.admin_cookie = Math.random().toString(36).substring(7);

            webshot(req.body.message, null, {
                cookies: [
                    req.session.cookie,
                    {
                        name: 'admin_cookie',
                        value: Math.random().toString(36).substring(7),
                        domain: 'localhost',
                        path: '/'
                    }
                ]
            }, function() {
                res.render('authenticated/messenger', {
                    message: `Message sent successfully to ${req.session.user.admin_username}`
                });
            });


        } else {
            res.render('authenticated/messenger', {
                message: "User not found"
            });
        }
    }
};