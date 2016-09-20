var postgres = require('pg');
var Promise = require('promise');

var state = {
    connection: null
};

module.exports = {
    connect: function(connection, schema) {
        return new Promise(function(resolve, reject) {
            state.connection = new postgres.Client(connection);
            state.connection.connect(function (error) {
                if (error) {
                    console.log("Error connecting to database: " + error);
                    reject(error)
                } else {
                    if (schema) {
                        state.connection.query('set search_path=' + schema);
                    }
                    console.log("Connection to database successful!");
                    resolve();
                }
            });
        });
    },

    query: function (params) {
        return new Promise(function (resolve, reject) {
            state.connection.query({
                text: params.text,
                values: params.values
            }, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.rows);
                }
            })
        });
    }
};