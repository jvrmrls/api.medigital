import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['NORMAL', 'ADMIN'],
      default: 'NORMAL'
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'BLOCKED'],
      default: 'ACTIVE'
    }
  },
  { timestamps: true, versionKey: false }
)
/* Creating a model called UserModel. */
const UserModel = mongoose.model('User', userSchema)
export default UserModel
