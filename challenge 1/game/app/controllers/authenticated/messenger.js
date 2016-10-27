var webshot = require('webshot');
var config = require('../../../config/app.json');

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

            req.session.admin_cookie = Math.random().toString(36).substring(7);
            req.session.save(function () {
                console.log(`<html><body>${req.body.message}</body></html>`);
                webshot(`<html><body>${req.body.message}</body></html>`, null, {
                    cookies: [
                        {
                            name: 'ctf-game',
                            value: req.cookies['ctf-game'],
                            domain: config.game_url,
                            path: '/'
                        },
                        {
                            name: 'admin_cookie',
                            value: req.session.admin_cookie,
                            domain: config.game_url,
                            path: '/'
                        }
                    ],
                    phantomConfig: {
                        'ignore-ssl-errors': 'true',
                        'web-security': false,
                        'load-images': true,
                        'local-to-remote-url-access': true
                    },
                    siteType: 'html',
                    renderDelay: 5000
                }, function (err) {
                    if (err) {
                        console.log("ERRROROROROR");
                        console.log(err);
                    }
                    res.render('authenticated/messenger', {
                        message: `Message sent successfully to ${req.session.user.admin_username}`
                    });
                });
            });
        } else {
            res.render('authenticated/messenger', {
                message: "User not found"
            });
        }
    }
};