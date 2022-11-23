/*
 * Created on Wed Sep 21 2022
 *
 * Authors: Javier Morales, Edgar Reyes, Carlos Cordero, Brian Rodas, Keny Chavez
 * Copyright (c) 2022 MEdigital
 */

/**
 * IMPORTS
 */
import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cron from 'node-cron'

import conn from './database/mongo.js'
import PatientController from './controllers/PatientController.js'
import MunicipalityController from './controllers/MunicipalityController.js'
import DepartmentController from './controllers/DepartmentController.js'
import CommonUserController from './controllers/CommonUserController.js'
import AppointmentController, {
  sendMailForTomorrow
} from './controllers/AppointmentController.js'
import PrescriptionController from './controllers/PrescriptionController.js'
import UserController from './controllers/UserController.js'
import EmployeeController from './controllers/EmployeeController.js'
import ConsultController from './controllers/ConsultController.js'
import DoctorController from './controllers/DoctorController.js'
import MedicineController from './controllers/MedicineController.js'
import MovementController from './controllers/MovementController.js'
import DiagnosticController from './controllers/DiagnosticController.js'
import InfoController from './controllers/InfoController.js'

/**
 * REQUIRED CONSTANTS
 **/
const port = process.env.PORT || 3000

/**
 * CREATION OF THE APP FROM EXPRESS
 */

const app = express()

cron.schedule('0 0 0 * * *', () => {
  sendMailForTomorrow()
})

// CONNECT TO DB
conn()
// Setting the configuration for the application
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
/**
 * ENDPOINTS TO SET THE RESPECTIVE CONTROLLER
 */
app.use('/api/patients', PatientController)
app.use('/api/municipalities', MunicipalityController)
app.use('/api/departments', DepartmentController)
app.use('/api/common-users', CommonUserController)
app.use('/api/appointments', AppointmentController)
app.use('/api/prescriptions', PrescriptionController)
app.use('/api/users', UserController)
app.use('/api/employees', EmployeeController)
app.use('/api/consults', ConsultController)
app.use('/api/doctors', DoctorController)
app.use('/api/medicines', MedicineController)
app.use('/api/movements', MovementController)
app.use('/api/diagnostics', DiagnosticController)
app.use('/api/info', InfoController)

/**
 * LISTENING APP
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
