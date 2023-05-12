import MunicipalityModel from '../models/MunicipalityModel.js'
import DepartmentModel from "../models/DepartmentModel.js";
import CompanyModel from "../models/CompanyModel.js";


export async function getParams(req, res){
    try{
        const company = await CompanyModel.find();
        const departments = await DepartmentModel.find();
        const municipalities = await MunicipalityModel.find();
        return res.status(200).json({company, departments, municipalities});
    } catch (err){
        return res.status(500).json(err);
    }
}
