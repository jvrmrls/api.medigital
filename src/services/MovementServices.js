import { validationResult } from 'express-validator'
import _ from 'lodash'
import MedicineModel from '../models/MedicineModel.js'
// Import model
import MovementModel from '../models/MovementModel.js'

export async function getAll(req, res) {
  try {
    const _data = await MovementModel.find({})
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
    const _data = await MovementModel.findOne({ _id })
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
    const { medicine, quantity, type, observations } = req.body
    const _movement = {
      medicine,
      quantity,
      type,
      observations
    }
    const _data = MovementModel(_.omitBy(_movement, _.isNull))
    await _data.save()
    // After save the movement, it has to update the medicine
    await MedicineModel.findByIdAndUpdate(
      medicine,
      {
        $inc: {
          quantity: type === 'IN' ? quantity : -quantity
        }
      },
      {
        new: true
      }
    )
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
    const _movement = {
      register,
      name,
      owner,
      active_principle: activePrinciple,
      usage
    }
    const _data = await MovementModel.findByIdAndUpdate(
      _id,
      _.omitBy(_movement, _.isNull),
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
    const _movement = await MovementModel.findByIdAndRemove(_id)
    /* Returning the response to the client. */
    return res.status(200).json(_movement)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
