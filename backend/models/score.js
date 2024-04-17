const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    score: {type:Number,required:true},
    timeTaken: {type:Number, required:true},
    shotsTaken : {type:Number, required:false}


});

module.exports = mongoose.model('score',scoreSchema);