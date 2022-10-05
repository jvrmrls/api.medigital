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
      enum: ['MARRIED', 'WIDOWED', 'SEPARATED', 'DIVORCED', 'SINGLE']
    },
    blood_type: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-']
    },
    family_history: {
      type: String,
      default: ''
    },
    personal_history: {
      type: String,
      default: ''
    },
    responsibles: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Responsible'
        },
        kinship: {
          type: String,
          enum: [
            'MOTHER',
            'FATHER',
            'BROTHER',
            'SISTER',
            'SON',
            'DAUGHTER',
            'GRANDSON',
            'GRANDDAUGHTER',
            'UNCLE',
            'AUNT',
            'GRANDMOTHER',
            'GRANDFATHER',
            'MOTHER IN LAW',
            'FATHER IN LAW',
            'BROTHER IN LAW',
            'SISTER IN LAW',
            'FRIEND',
            'KNOWN'
          ],
          required: true
        }
      }
    ],
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE']
    }
  },
  {
    timestamps: true
  }
)
/* Creating a model called Patient. */
const Patient = mongoose.model('Patient', patientSchema)
export default Patient
