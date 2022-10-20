import mongoose from 'mongoose'

const { Schema } = mongoose

const dateSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    hour: {
      type: String,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    observations: {
      type: String,
      default: ''
    },
    booked_by: {
      type: Schema.Types.ObjectId,
      ref: 'CommonUser',
      default: null
    },
    status: {
      type: String,
      enum: ['PENDING', 'WAITING', 'IN PROGRESS', 'FINISHED', 'CANCELED'],
      default: 'PENDING'
    }
  },
  { timestamps: true, versionKey: false }
)

dateSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.createdAt
  delete obj.updatedAt
  return obj
}
/* Creating a model called DateModel. */
const DateModel = mongoose.model('Date', dateSchema)
export default DateModel
