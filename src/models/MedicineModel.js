import mongoose from 'mongoose'

const { Schema } = mongoose

const medicineSchema = Schema(
  {
    register: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      default: ''
    },
    active_principle: {
      type: String,
      default: ''
    },
    usage: {
      type: String,
      default: ''
    },
    quantity: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true, versionKey: false }
)
medicineSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.createdAt
  delete obj.updatedAt
  return obj
}
/* Creating a model called MedicineModel. */
const MedicineModel = mongoose.model('Medicine', medicineSchema)
export default MedicineModel
