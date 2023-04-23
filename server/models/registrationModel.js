const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  roll: {
    type: String,
    unique: true,

  },
  email: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,

  },
  profile: {
    type: String,

  },
  skills:{
    type: [String],
    default:[],
  },
  image: {
    type:String,
  }
});

module.exports = mongoose.model('Student', schema);
