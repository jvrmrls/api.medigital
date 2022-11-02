import mongoose from 'mongoose'

const { Schema } = mongoose

const commonUserSchema = Schema(
  {
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
  },
  { timestamps: true, versionKey: false }
)

commonUserSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.createdAt
  delete obj.updatedAt
  return obj
}
/* Creating a model called CommonUserModel. */
const CommonUserModel = mongoose.model('CommonUser', commonUserSchema)
export default CommonUserModel
