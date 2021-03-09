const mongoose = require('mongoose')
// const User = require('../user')
const Schema = mongoose.Schema
const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
}
)
module.exports = postSchema
