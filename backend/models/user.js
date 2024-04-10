const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    number:{type:Number,required:true,unique:true},
    name: {type:String,required:true}


});

module.exports = mongoose.model('user',userSchema);