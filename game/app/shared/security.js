var bcrypt = require('bcrypt');

module.exports = {
    hashPassword: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },
    verifyPassword: function(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
};
