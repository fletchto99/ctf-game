#!/usr/bin/env node

var express = require('express');
var morgan = require('morgan');
var appConfig = require('./config/app.json');
var dbConfig = require('./config/database.json');
var database = require('./app/database');

database.connect(dbConfig, null).then(function () {

    var game = express();
    var portal = express();

    game.use(morgan('combined'));
    portal.use(morgan('combined'));

    game.set('trust proxy', 1);
    portal.set('trust proxy', 1);

    game.set('views', './app/views/game');
    portal.set('views', './app/views/portal');

    game.set('view engine', 'pug');
    portal.set('view engine', 'pug');

    game.use('/', require('./app/middleware'));
    portal.use('/', require('./app/middleware'));

    game.use('/', require('./app/controllers/game'));

    game.listen(appConfig.game_port, function() {
        console.log("Game ready!")
    });
    portal.listen(appConfig.portal_port, function() {
        console.log("Portal ready!")
    });
}, function () {
    console.log("Error connecting to database!");
    process.exit(1);
});
