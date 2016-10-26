/**
 * Created by parkjaesung on 2016. 10. 25..
 */
var express = require('express');
var path = require('path');
var project = express.Router();
var Controller = require('../controllers/blockfactoryController');

project.get('/', function(req, res){

    Controller.blockFactory(req,res);
});

project.post('/block/new/', function(req, res){
    Controller.newBlock(req, res);
});

module.exports = project;