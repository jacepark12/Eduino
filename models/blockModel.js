/**
 * Created by parkjaesung on 2016. 10. 25..
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blockSchema = new Schema({
    category : String,
    blocktype : String,
    description : String,
    blockjs : String,
    generatorjs : String,
    createdDate : Date
});

module.exports = mongoose.model('block', blockSchema);
