import { validationResult } from 'express-validator'
import _ from 'lodash'
// Import model
import DateModel from '../models/DateModel.js'

export async function getAll(req, res) {
  try {
    let query = {}
    const { booked_by, date } = req.query
    if (booked_by) query = { ...query, booked_by: req.user._id }
    if (date) query = { ...query, date }
    const _data = await DateModel.find(query).populate('booked_by', {
      _id: 0,
      password: 0,
      platform: 0,
      createdAt: 0,
      updatedAt: 0
    })
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
    const _data = await DateModel.findOne({ _id }).populate('booked_by', {
      _id: 0,
      password: 0,
      platform: 0
    })
    if (!_data) return res.status(400).json({ msg: 'No se encontró la cita' })
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
    const { name, reason, date, hour, observations, status } = req.body
    const _date = DateModel({
      name,
      reason,
      date,
      hour,
      observations,
      booked_by: req.user._id,
      status
    })
    await _date.save()
    return res.status(201).json(_date)
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
    const { name, reason, date, hour, observations, status } = req.body
    const _date = {
      name,
      reason,
      date,
      hour,
      observations,
      status
    }
    const _data = await DateModel.findByIdAndUpdate(
      _id,
      _.omitBy(_date, _.isNull),
      {
        new: true
      }
    )
    return res.status(200).json(_data)
  } catch (err) {
    console.log(err)
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
    const _date = await DateModel.findByIdAndRemove(_id)
    /* Returning the response to the client. */
    return res.status(200).json(_date)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
