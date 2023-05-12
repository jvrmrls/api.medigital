import mongoose from "mongoose";

const { Schema } = mongoose;

const companySchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'LOCKED', 'INACTIVE', 'PENDING'],
            default: 'ACTIVE'
        }
    },
    { timestamps: true, versionKey: false }
);

companySchema.methods.toJSON = function (){
    let obj = this.toObject();
    obj._status = getStatusNameInSpanish(obj.status);
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
}

const CompanyModel = mongoose.model('Company', companySchema);
export default CompanyModel;

const getStatusNameInSpanish = (status) => {
    switch (status) {
        case 'ACTIVE':
            return 'ACTIVO'
    case 'LOCKED':
        return 'BLOQUEADO'
    case 'INACTIVE':
        return 'INACTIVO'
    case 'PENDING':
        return 'PENDIENTE'
    default:
        return 'DESCONOCIDO'
    }
}