const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Collapmp3:collab123@cluster0.owjvkr5.mongodb.net/test', {

})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

module.exports = mongoose;
