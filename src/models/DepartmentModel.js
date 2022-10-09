import mongoose from 'mongoose'

const { Schema } = mongoose

const departmentSchema = Schema(
  {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    iso: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
)
/* Creating a model called DepartmentModel. */
const DepartmentModel = mongoose.model('Department', departmentSchema)
export default DepartmentModel
