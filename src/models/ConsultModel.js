import mongoose from 'mongoose'

const { Schema } = mongoose

const consultSchema = Schema(
  {
    date: {
      type: Date,
      required: true
    },
    start_hour: {
      type: String,
      default: ''
    },
    end_hour: {
      type: String,
      default: ''
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      default: null
    },
    reason: {
      type: String,
      default: ''
    },
    physical_finding: {
      type: String,
      default: ''
    },
    medical_record: {
      type: String,
      default: ''
    },
    diagnostic: {
      type: Array,
      default: []
    },
    prescriptions: {
      type: Array,
      default: []
    },
    observations: {
      type: String,
      default: ''
    },
    prev_date: {
      type: Schema.Types.ObjectId,
      ref: 'Date',
      default: null
    },
    status: {
      type: String,
      enum: ['WAITING', 'IN PROGRESS', 'FINISHED', 'CANCELED'],
      default: 'WAITING'
    }
  },
  { timestamps: true, versionKey: false }
)
/* Creating a model called ConsultModel. */
const ConsultModel = mongoose.model('Consult', consultSchema)
export default ConsultModel
