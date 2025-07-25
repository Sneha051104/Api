const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  image: {
    public_id: String,
    url: String
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);