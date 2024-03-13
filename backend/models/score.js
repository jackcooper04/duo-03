const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
    initals:{type:String,required:true},
    score: {type:Number,required:true}


});

module.exports = mongoose.model('score',scoreSchema);