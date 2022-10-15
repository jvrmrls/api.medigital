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
      required: true
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
      required: true
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
    other_diagnostic: {
      type: String,
      default: ''
    },
    prescriptions: {
      type: Array,
      default: []
    },
    observations: {
      type: String,
      default: ''
    }
  },
  { timestamps: true, versionKey: false }
)
/* Creating a model called ConsultModel. */
const ConsultModel = mongoose.model('Consult', consultSchema)
export default ConsultModel
