var database = require('../../database');
var validator = require('../../shared/validator');
var security = require('../../shared/security');
var Promise = require('promise');

module.exports = {
    register(params) {
        return new Promise(function (resolve, reject) {
            var errors = validator.validate(params, {
                username: validator.isString,
                password: validator.isString,
                confirm_password: validator.isString
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
                        text: 'INSERT INTO Game_Users(Username, Password, Admin_Username) VALUES ($1, $2, $3) returning Admin_Username',
                        values: [params.username, security.hashPassword(params.password), `admin_${Math.random().toString(36).substr(2, 5)}`]
                    }).then(function (results) {
                        console.log(results);
                        resolve({
                            username: params.username,
                            email: params.email,
                            admin_username: results[0].Admin_Username
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
                    reject({
                        error: 'Invalid username or password!'
                    });
                } else if (security.verifyPassword(params.password, results[0].password)) {
                    delete results[0].password;
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

    fetchProfile(params) {
        return new Promise(function (resolve, reject) {
            var errors = validator.validate(params, {
                profile_id: validator.isInteger
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
                text: "SELECT * " +
                "FROM Profile " +
                "WHERE Profile_ID = $1",
                values: [params.profile_id]
            }).then(function (results) {
                resolve(results.rows[0])
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
            var errors = validator.validate(params, {
                profile_id: validator.isInteger,
                first_name: validator.isString,
                last_name: validator.isString
            });

            if (errors) {
                reject({
                    error: true,
                    type: 'validation',
                    rejected_parameters: errors
                });
                return;
            }

            if (params.dob == "") {
                params.dob = null;
            }

            if (params.gender == "") {
                params.gender = null;
            }

            if (params.occupation == "") {
                params.occupation = null;
            }

            if (params.device_used == "") {
                params.device_used = null;
            }

            database.query({
                text: "UPDATE Profile " +
                "SET First_Name = $1, " +
                "last_name = $2, " +
                "dob = $3, " +
                "gender = $4, " +
                "occupation = $5, " +
                "device_used = $6 " +
                "WHERE Profile_ID = $7",
                values: [params.first_name, params.last_name, params.dob, params.gender, params.occupation, params.device_used, params.profile_id]
            }).then(function () {
                resolve(params)
            }, function (error) {
                reject({
                    error: 'Error logging in, please try again later!',
                    dev_error: error
                });
            });
        });
    }


};