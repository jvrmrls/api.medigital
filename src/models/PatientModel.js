import mongoose from 'mongoose'

const { Schema } = mongoose

const patientSchema = Schema(
  {
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
    ],
    birthday: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['M', 'F', 'N/E'],
      default: 'N/E'
    },
    dui: {
      type: String,
      default: ''
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
    marital_status: {
      type: String,
      enum: ['MARRIED', 'WIDOWED', 'SEPARATED', 'DIVORCED', 'SINGLE', 'N/D'],
      default: 'N/D'
    },
    blood_type: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'N/D'],
      default: 'N/D'
    },
    family_history: {
      type: String,
      default: ''
    },
    personal_history: {
      type: String,
      default: ''
    },
    responsibles: {
      type: Array,
      default: []
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
patientSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.createdAt
  delete obj.updatedAt
  return obj
}
/* Creating a model called Patient. */
const Patient = mongoose.model('Patient', patientSchema)
export default Patient
