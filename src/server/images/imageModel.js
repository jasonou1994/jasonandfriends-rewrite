const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name : {type : String, required : true},
    tags : [String], //Cities and Culture, Landscapes, Wildlife, Macro and Abstract, Portraits
    prices : [{
        size : String,
        amount : String
    }]
})

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;