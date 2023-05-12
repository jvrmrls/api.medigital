import CompanyModel from '../models/CompanyModel.js'
import { validationResult } from 'express-validator'

export async function create(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { name, description } = req.body
    const _company = CompanyModel({
      name,
      description
    })
    await _company.save()
    /* Returning the response to the client. */
    return res.status(201).json(_company)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
