module.exports =  {
    get(req, res) {
        if (req.session.user.admin_session) {
            res.render('authenticated/dashboard', {
                admin_flag: "flag{csrf_is_dangerous}"
            });
        } else {
            res.render('authenticated/dashboard');
        }
    }
};