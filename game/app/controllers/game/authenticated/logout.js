module.exports = function (request, res) {
    request.session.destroy(function () {
        res.redirect("/");
    });
};