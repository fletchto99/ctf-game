module.exports =  {
    get(req, res) {
        //Prevent CSRF from destroying the user's session due to the weird cookie implementation I am using
        if (req.cookies['admin_cookie'] && req.session.admin_cookie && req.cookies['admin_cookie'] == req.session.admin_cookie) {
            res.redirect('/')
        } else {
            req.session.destroy(function (err) {
                res.redirect("/");
            });
        }
    }
};