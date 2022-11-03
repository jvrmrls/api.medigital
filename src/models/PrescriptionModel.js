import mongoose from 'mongoose'

const { Schema } = mongoose

const detailPrescriptionSchema = Schema({
  medicine: {
    type: Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  dose: {
    type: String,
    default: ''
  }
})

const prescriptionSchema = Schema(
  {
    consult: {
      type: Schema.Types.ObjectId,
      ref: 'Consult',
      required: true
    },
    details: [{ type: detailPrescriptionSchema }]
  },
  { timestamps: true, versionKey: false }
)
prescriptionSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.createdAt
  delete obj.updatedAt
  return obj
}
/* Creating a model called PrescriptionModel. */
const PrescriptionModel = mongoose.model('Prescription', prescriptionSchema)
export default PrescriptionModel
