import { validationResult } from 'express-validator'
// Import model
import DiagnosticModel from '../models/DiagnosticModel.js'

export async function getAll(req, res) {
  try {
    /* A query to the database. */
    const _data = await DiagnosticModel.find({})
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
    /* A query to the database. */
    const _data = await DiagnosticModel.findOne({ _id })
    if (!_data)
      return res.status(400).json({ msg: 'No se encontró el diagnóstico' })
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
    /* A query to the database. */
    const _data = await DiagnosticModel.findOne({
      code
    })
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
