import mongoose from 'mongoose'

const { Schema } = mongoose

const toolSchema = Schema(
    {
        label: {
            type: String,
            required: true
        },
        order: {
            type: Number,
            default: -1
        },
        description: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        is_active: {
            type: Boolean,
            default: true
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'Tool'
        }
    },
    { timestamps: true, versionKey: false }
    )
toolSchema.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj.createdAt
    delete obj.updatedAt
    return obj
}
/* Creating a model called MunicipalityModel. */
const ToolModel = mongoose.model('Tool', toolSchema)
export default ToolModel
