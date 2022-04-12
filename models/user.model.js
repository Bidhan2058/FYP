const mongoose = require('mongoose');

const schema = mongoose.Schema; // class ho tei vayera () use vayena 

const UserSchema = new schema({
    fullname: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true
    },
   
})

const UserModel = mongoose.model('user',UserSchema);

module.exports = UserModel;