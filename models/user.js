const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
  name: {
    type: String,
    require: false,
    min: 3,
    max: 256
  },
  email: {
    type: String,
    require: true,
    min: 6,
    max: 256
  },
  celular: {
    type: String,
    require: false,
    min: 10,
    max: 10
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 256
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('user', user_schema)