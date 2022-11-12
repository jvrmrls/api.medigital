import mongoose from 'mongoose'

const { Schema } = mongoose

const movementSchema = Schema(
  {
    medicine: {
      type: Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['IN', 'OUT'],
      required: true
    },
    observations: {
      type: String,
      default: ''
    }
  },
  { timestamps: true, versionKey: false }
)
movementSchema.methods.toJSON = function () {
  var obj = this.toObject()
  // FORMAT IN SPANISH TYPE MOVEMENT
  obj._type =
    (obj.observations?.includes('!AJUSTE') ? 'AJUSTE DE ' : '') + obj.type ===
    'IN'
      ? 'CARGA'
      : 'DESCARGA'
  delete obj.createdAt
  delete obj.updatedAt
  return obj
}
/* Creating a model called MovementModel. */
const MovementModel = mongoose.model('Movement', movementSchema)
export default MovementModel
