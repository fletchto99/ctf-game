module.exports =  {
    get(req, res) {
        req.session.destroy(function (err) {
            res.redirect("/");
        });
    }
};