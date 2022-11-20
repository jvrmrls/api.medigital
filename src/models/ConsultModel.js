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
    prescriptions: {
      type: Array,
      default: []
    },
    observations: {
      type: String,
      default: ''
    },
    prev_appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
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
consultSchema.methods.toJSON = function () {
  var obj = this.toObject()
  // FORMAT IN SPANISH STATUS
  obj._status = getStatusNameInSpanish(obj.status)
  delete obj.createdAt
  delete obj.updatedAt
  return obj
}
/* Creating a model called ConsultModel. */
const ConsultModel = mongoose.model('Consult', consultSchema)
export default ConsultModel

const getStatusNameInSpanish = (status) => {
  switch (status) {
    case 'FINISHED':
      return 'FINALIZADA'
    case 'IN PROGRESS':
      return 'EN PROCESO'
    case 'PENDING':
      return 'PENDIENTE'
    case 'WAITING':
      return 'EN SALA DE ESPERA'
    default:
      return 'DESCONOCIDO'
  }
}
