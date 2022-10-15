import mongoose from 'mongoose'

const { Schema } = mongoose

const doctorSchema = Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    phone_number: {
      type: Array,
      default: []
    },
    birthday: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      default: ''
    },
    specialties: {
      type: Array,
      default: []
    },
    dui: {
      type: String,
      required: true
    },
    address: {
      type: String,
      default: ''
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    municipality: {
      type: Schema.Types.ObjectId,
      ref: 'Municipality',
      required: true
    },
    jvpm: {
      type: String,
      default: ''
    },
    type: {
      type: Array,
      default: []
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    }
  },
  { timestamps: true, versionKey: false }
)
/* Creating a model called DoctorModel. */
const DoctorModel = mongoose.model('Doctor', doctorSchema)
export default DoctorModel
