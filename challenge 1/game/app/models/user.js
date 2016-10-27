var database = require('../database');
var validator = require('../shared/validator');
var security = require('../shared/security');
var Promise = require('promise');

module.exports = {
    register(params) {
        return new Promise(function (resolve, reject) {
            var errors = validator.validate(params, {
                username: validator.isString,
                password: validator.isString,
                confirm_password: validator.isString,
                first_name: validator.isString,
                last_name: validator.isString,
                email: validator.isString
            });

            if (errors) {
                reject({
                    error: true,
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            if (params.password != params.confirm_password) {
                reject({
                    error: true,
                    type: 'validation',
                    message: 'Passwords do not match'
                });
                return;
            }

            database.query({
                text: "SELECT COUNT(*) as count FROM Game_Users WHERE username = $1",
                values: [params.username]
            }).then(function (results) {
                if (results[0].count > 0) {
                    reject({
                        error: 'Username already taken!'
                    });
                } else {
                    database.query({
                        text: 'INSERT INTO Game_Users(Username, Password, First_Name, Last_Name, Email, Admin_Username) VALUES ($1, $2, $3, $4, $5, $6) returning Admin_Username, User_ID',
                        values: [params.username, security.hashPassword(params.password), params.first_name, params.last_name, params.email, `admin_${Math.random().toString(36).substr(2, 5)}`]
                    }).then(function (results) {
                        resolve({
                            admin_session: false,
                            user_id: parseInt(results[0].user_id),
                            username: params.username,
                            first_name: params.first_name,
                            last_name: params.last_name,
                            email: params.email,
                            admin_username: results[0].admin_username
                        })
                    }, function (error) {
                        reject({
                            error: 'An unexpected error has occurred! Please try again later.',
                            dev_error: error
                        });
                    });
                }
            }, function () {
                reject({
                    error: 'Error generating account!'
                });
            })
        });
    },

    authenticate(params) {
        return new Promise(function (resolve, reject) {
            var errors = validator.validate(params, {
                username: validator.isString,
                password: validator.isString
            });

            if (errors) {
                reject({
                    error: true,
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            database.query({
                text: "SELECT * FROM Game_Users WHERE Username = $1",
                values: [params.username]
            }).then(function (results) {
                if (results.length < 1) {
                    //Never tell the user account not found! Can be used to created an index of existing accounts for easy hacking
                    database.query({
                        text: "SELECT * FROM Game_Users WHERE Admin_Username = $1",
                        values: [params.username]
                    }).then(function (results) {
                        if (results.length == 1 && results[0].admin_password && security.verifyPassword(params.password, results[0].admin_password)) {
                            delete results[0].password;
                            delete results[0].admin_password;
                            results[0].admin_session = true;
                            resolve(results[0]);
                        } else {
                            reject({
                                error: 'Invalid username or password!'
                            });
                        }
                    });
                } else if (security.verifyPassword(params.password, results[0].password)) {
                    delete results[0].password;
                    delete results[0].admin_password;
                    results[0].user_id = parseInt(results[0].user_id);
                    resolve(results[0]);
                } else {
                    reject({
                        error: 'Invalid username or password!'
                    });
                }
            }, function (error) {
                reject({
                    error: 'Error logging in, please try again later!',
                    dev_error: error
                });
            });
        });
    },

    updateProfile(params) {
        return new Promise(function (resolve, reject) {

            if (params.password != params.confirm_password) {
                reject({
                    error: 'Passwords do not match'
                });
                return;
            }

            let columns = [];
            let values = [];

            if (params.first_name && params.first_name != '') {
                columns.push("first_name");
                values.push(params.first_name)
            }

            if (params.last_name && params.last_name != '') {
                columns.push("last_name");
                values.push(params.last_name);
            }

            if (params.email && params.email != '') {
                columns.push("email");
                values.push(params.email);
            }

            if (params.password && params.password != '') {
                columns.push("password");
                values.push(security.hashPassword(params.password))
            }

            let update = "";

            columns.forEach((item, index) => {
                if (params.admin) {
                    update+= 'admin_'
                }
                update += `${item} = $${index + 1},`
            });

            if (values.length == 0) {

                reject({
                    error: 'No values being updated'
                });
                return;
            }

            values.push(params.user_id);

            database.query({
                text: `UPDATE Game_Users SET ${update.substr(0, update.length - 1)} WHERE User_ID = $${columns.length + 1}`,
                values: values
            }).then(function () {
                resolve();
            }, function (error) {
                reject({
                    error: 'Error updating profile!',
                    dev_error: error
                });
            });
        });
    }


};