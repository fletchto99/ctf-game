module.exports =  {
    get(request, res) {
        request.session.destroy(function () {
            res.redirect("/");
        });
    }
};