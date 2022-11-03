import mongoose from 'mongoose'

const { Schema } = mongoose

const diagnosticSchema = Schema(
  {
    code: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
)
diagnosticSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.createdAt
  delete obj.updatedAt
  return obj
}
/* Creating a model called DiagnosticModel. */
const DiagnosticModel = mongoose.model('Diagnostic', diagnosticSchema)
export default DiagnosticModel
