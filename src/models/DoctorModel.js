import mongoose from 'mongoose'

const { Schema } = mongoose

const doctorSchema = Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    specialties: {
      type: Array,
      default: []
    },
    jvpm: {
      type: String,
      default: ''
    },
    type: {
      type: Array,
      default: []
    }
  },
  { timestamps: true, versionKey: false }
)
doctorSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.createdAt
  delete obj.updatedAt
  return obj
}
/* Creating a model called DoctorModel. */
const DoctorModel = mongoose.model('Doctor', doctorSchema)
export default DoctorModel
