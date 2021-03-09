const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  teacher: {
    type: Boolean
    // required: true
  },
  token: String

}, {
  timestamps: true,
  toObject: {
    virtuals: true,
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  },
  toJSON: { virtuals: true }
})

module.exports = mongoose.model('User', userSchema)
