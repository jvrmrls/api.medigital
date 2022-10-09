import mongoose from 'mongoose'

const { Schema } = mongoose

const commonUserSchema = Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  platform: {
    type: String,
    enum: ['GOOGLE', 'FACEBOOK', 'NATIVE'],
    required: true
  }
})
/* Creating a model called CommonUserModel. */
const CommonUserModel = mongoose.model('CommonUser', commonUserSchema)
export default CommonUserModel
