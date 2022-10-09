import mongoose from 'mongoose'

const { Schema } = mongoose

const dateSchema = Schema({
  name: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
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
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'WAITING', 'IN PROGRESS', 'FINISHED', 'CANCELED'],
    default: 'PENDING'
  }
})
/* Creating a model called DateModel. */
const DateModel = mongoose.model('Date', dateSchema)
export default DateModel
