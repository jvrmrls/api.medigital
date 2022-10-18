import mongoose from 'mongoose'

const { Schema } = mongoose

const employeeSchema = Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    dui: {
      type: String,
      required: true
    },
    isss: {
      type: String,
      default: ''
    },
    afp: {
      type: String,
      default: ''
    },
    birthday: {
      type: Date,
      default: null
    },
    phone_number: {
      type: Array,
      default: []
    },
    email: {
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true, versionKey: false }
)
/* Creating a model called EmployeeModel. */
const EmployeeModel = mongoose.model('Employee', employeeSchema)
export default EmployeeModel
