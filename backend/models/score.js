const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    score: {type:Number,required:true}


});

module.exports = mongoose.model('score',scoreSchema);