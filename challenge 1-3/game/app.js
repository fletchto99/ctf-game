#!/usr/bin/env node

var express = require('express');
var morgan = require('morgan');
var appConfig = require('./config/app.json');
var dbConfig = require('./config/database.json');
var database = require('./app/database');

database.connect(dbConfig, null).then(function () {

    var game = express();

    game.use(morgan('combined'));
    game.set('trust proxy', 1);

    game.set('views', './app/views');
    game.set('view engine', 'pug');
    game.use('/', require('./app/middleware'));
    game.use('/', require('./app/controllers'));

    game.listen(appConfig.game_port, function() {
        console.log("Game ready!")
    });
}, function () {
    console.log("Error connecting to database!");
    process.exit(1);
});
