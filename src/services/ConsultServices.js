import { validationResult } from 'express-validator'
import _ from 'lodash'
// Import model
import ConsultModel from '../models/ConsultModel.js'

export async function getAll(req, res) {
  try {
    let query = {}
    const { status, date } = req.query
    if (status) query = { ...query, status }
    if (date) query = { ...query, date }
    const _data = await ConsultModel.find(query).populate('prev_date', {
      name: 0,
      observations: 0,
      reason: 0,
      booked_by: 0,
      status: 0,
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
    const _data = await ConsultModel.findOne({ _id }).populate('prev_date', {
      name: 0,
      observations: 0,
      reason: 0,
      booked_by: 0,
      status: 0,
      createdAt: 0,
      updatedAt: 0
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
    const { date, patient, doctor, reason, observations, prevDate } = req.body
    const _consult = ConsultModel({
      date,
      patient,
      doctor,
      reason,
      observations,
      prev_date: prevDate
    })
    await _consult.save()
    return res.status(201).json(_consult)
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
    const {
      date,
      startHour,
      endHour,
      patient,
      doctor,
      reason,
      physicalFinding,
      medicalRecord,
      diagnostic,
      observations,
      prevDate,
      status
    } = req.body
    const _consult = {
      date,
      start_hour: startHour,
      end_hour: endHour,
      patient,
      doctor,
      reason,
      physical_finding: physicalFinding,
      medical_record: medicalRecord,
      diagnostic,
      observations,
      prev_date: prevDate,
      status
    }
    const _data = await ConsultModel.findByIdAndUpdate(
      _id,
      _.omitBy(_consult, _.isNull),
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
    const _consult = await ConsultModel.findByIdAndRemove(_id)
    /* Returning the response to the client. */
    return res.status(200).json(_consult)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
