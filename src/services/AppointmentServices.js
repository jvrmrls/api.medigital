import { validationResult } from 'express-validator'
import _ from 'lodash'
// Import model
import AppointmentModel from '../models/AppointmentModel.js'

export async function getAll(req, res) {
  try {
    let query = {}
    const { booked_by, date } = req.query
    if (booked_by) query = { ...query, booked_by: req.user._id }
    if (date) query = { ...query, date }
    const _data = await AppointmentModel.find(query).populate('booked_by', {
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
    const _data = await AppointmentModel.findOne({ _id }).populate(
      'booked_by',
      {
        _id: 0,
        password: 0,
        platform: 0
      }
    )
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
    const _appointment = AppointmentModel({
      name: name?.toUpperCase(),
      reason: reason?.toUpperCase(),
      date,
      hour,
      observations: observations?.toUpperCase(),
      booked_by: req.user._id,
      status
    })
    await _appointment.save()
    return res.status(201).json(_appointment)
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
    const _appointment = {
      name: name?.toUpperCase(),
      reason: reason?.toUpperCase(),
      date,
      hour,
      observations: observations?.toUpperCase(),
      status
    }
    const _data = await AppointmentModel.findByIdAndUpdate(
      _id,
      _.omitBy(_appointment, _.isNull),
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
    const _appointment = await AppointmentModel.findByIdAndRemove(_id)
    /* Returning the response to the client. */
    return res.status(200).json(_appointment)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
