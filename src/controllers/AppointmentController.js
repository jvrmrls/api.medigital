import { Router } from 'express'
import { param, body, query } from 'express-validator'
import {
  getAll,
  getSpecific,
  create,
  update,
  deleteSpecific,
  getAvailable,
  getTomorrowAppointments
} from '../services/AppointmentServices.js'
import { authenticateToken } from '../helpers/jwt.js'
import nodemailer from 'nodemailer'
import moment from 'moment'

const router = Router()

// GET /api/appointment/ || /api/appointment?booked_by=
router.get('/', authenticateToken, getAll)
// GET /api/appointment/available-hours?date=
router.get(
  '/available-hours',
  authenticateToken,
  query('date').isDate().withMessage('La fecha es requerida'),
  getAvailable
)
// GET /api/appointment/:_id
router.get(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  getSpecific
)
// POST /api/appointment/
router.post(
  '/',
  authenticateToken,
  body('name').notEmpty().withMessage('El nombre no es válido'),
  body('date').isISO8601().withMessage('La fecha no es válida'),
  body('hour').notEmpty().withMessage('La hora no es válida'),
  body('reason').notEmpty().withMessage('La razón no es válida'),
  create
)
// PUT /api/appointment/:_id
router.put(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  body('name').notEmpty().withMessage('El nombre no es válido'),
  body('date').isISO8601().withMessage('La fecha no es válida'),
  body('hour').notEmpty().withMessage('La hora no es válida'),
  body('reason').notEmpty().withMessage('La razón no es válida'),
  update
)
// DELETE /api/appointment/:_id
router.delete(
  '/:_id',
  authenticateToken,
  param('_id').isMongoId().withMessage('El ID no es del formato correcto'),
  deleteSpecific
)

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})

// Send Mail
export const sendMailForTomorrow = async () => {
  try {
    const appointments = await getTomorrowAppointments()
    if (appointments.length <= 0) return
    await Promise.all(
      appointments.map((element) => {
        const mailOpt = {
          from: process.env.MAILER_USER,
          to: element.booked_by.email,
          subject: `Recordatorio de cita medica MEDIGITAL #${element._id}`,
          text: `Hola ${element.booked_by.first_name}. \n\nTe recordamos que el día de mañana tienes una cita en nuestras instalaciones a las ${element.hour} horas.\nRecuerda llevar tu cita impresa o en digital para facilitar el trámite de tu consulta. \n\nTe esperamos.`
        }
        transporter.sendMail(mailOpt, (err, success) => {
          if (err) throw err
          console.log(success)
        })
      })
    )
  } catch (err) {
    console.log(err)
  }
}

export default router
