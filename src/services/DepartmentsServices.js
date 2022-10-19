import { validationResult } from 'express-validator'
// Import model
import DepartmentModel from '../models/DepartmentModel.js'
/*
import nodemailer from 'nodemailer'

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
const mailOpt = {
  from: process.env.MAILER_USER,
  to: 'erk5530@gmail.com',
  subject: 'Node Test Mailer',
  text: 'Hello dear! '
}
transporter.sendMail(mailOpt, (err, success) => {
  if (err) throw err
  console.log(success)
})*/
export async function getAll(req, res) {
  try {
    const _data = await DepartmentModel.find({})
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function getSpecific(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { _id } = req.params
    const _data = await DepartmentModel.findOne({ _id })
    if (!_data)
      return res.status(400).json({ msg: 'No se encontró el departamento' })
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function getSpecificByCode(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { code } = req.params
    const _data = await DepartmentModel.findOne({
      code: ('0' + code).slice(-2)
    })
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
