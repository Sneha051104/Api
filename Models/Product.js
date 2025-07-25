const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    public_id: String,
    url: String
  }
});

module.exports = mongoose.model('Product', productSchema);