import mongoose from 'mongoose'

const { Schema } = mongoose

const responsibleSchema = Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  phone_number: [
    {
      type: String
    }
  ]
})
/* Creating a model called ResponsibleModel. */
const ResponsibleModel = mongoose.model('Municipality', responsibleSchema)
export default ResponsibleModel
