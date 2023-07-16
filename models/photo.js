const mongoose = require('mongoose')

const photo_schema = mongoose.Schema({
  url: {
    type: String,
    require: true,
    min: 6
  },
  user_id: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('photo', photo_schema)