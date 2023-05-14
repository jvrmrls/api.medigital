import { validationResult } from 'express-validator'
import _ from 'lodash'
// Import model
import MedicineModel from '../models/MedicineModel.js'

export async function getAll(req, res) {
  try {
    const { company } = req
    let query = {}
    const { available } = req.query
    if (available) query = { ...query, quantity: { $gt: 0 } }
    const _data = await MedicineModel.find({ ...query, company })
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
    const _data = await MedicineModel.findOne({ _id })
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function create(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { company } = req
    const { register, name, owner, activePrinciple, usage } = req.body
    const _medicine = {
      register,
      name,
      owner,
      active_principle: activePrinciple,
      usage,
      company
    }
    const _data = MedicineModel(_.omitBy(_medicine, _.isNull))
    await _data.save()
    /* Returning the response to the client. */
    return res.status(201).json(_data)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function update(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { _id } = req.params
    const { register, name, owner, activePrinciple, usage } = req.body
    const _medicine = {
      register,
      name,
      owner,
      active_principle: activePrinciple,
      usage
    }
    const _data = await MedicineModel.findByIdAndUpdate(
      _id,
      _.omitBy(_medicine, _.isNull),
      {
        new: true
      }
    )
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function deleteSpecific(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { _id } = req.params
    const _medicine = await MedicineModel.findByIdAndRemove(_id)
    /* Returning the response to the client. */
    return res.status(200).json(_medicine)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
