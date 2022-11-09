import { validationResult } from 'express-validator'
import _ from 'lodash'
// Import model
import ConsultModel from '../models/ConsultModel.js'
import AppointmentModel from '../models/AppointmentModel.js'

export async function getAll(req, res) {
  try {
    let query = {}
    const { status, date } = req.query
    if (status) query = { ...query, status }
    if (date) query = { ...query, date }
    const _data = await ConsultModel.find(query)
      .populate('prev_appointment', {
        name: 0,
        observations: 0,
        reason: 0,
        booked_by: 0,
        status: 0
      })
      .populate('patient', { first_name: 1, last_name: 1 })
      .populate({
        path: 'doctor',
        populate: {
          path: 'employee',
          select: { first_name: 1, last_name: 1 }
        },
        select: { employee: 1 }
      })
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    console.log(err)
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
    const _data = await ConsultModel.findOne({ _id })
      .populate('prev_appointment', {
        date: 1,
        hour: 1
      })
      .populate('patient', { first_name: 1, last_name: 1 })
      .populate({
        path: 'doctor',
        populate: {
          path: 'employee',
          select: { first_name: 1, last_name: 1 }
        },
        select: { employee: 1 }
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
    const { date, patient, doctor, reason, observations, prevAppointment } =
      req.body
    const _consult = ConsultModel({
      date,
      patient,
      doctor,
      reason,
      observations,
      prev_appointment: prevAppointment !== '' ? prevAppointment : null
    })
    await _consult.save()
    if (prevAppointment) {
      await AppointmentModel.findByIdAndUpdate(prevAppointment, {
        status: 'WAITING'
      })
    }
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
      start_hour,
      end_hour,
      patient,
      doctor,
      reason,
      physical_finding,
      medical_record,
      diagnostic,
      observations,
      prev_appointment,
      status
    } = req.body
    const _consult = {
      date,
      start_hour,
      end_hour,
      patient,
      doctor,
      reason,
      physical_finding,
      medical_record,
      diagnostic,
      observations,
      prev_appointment,
      status
    }
    const _data = await ConsultModel.findByIdAndUpdate(
      _id,
      _.omitBy(_consult, _.isNull),
      {
        new: true
      }
    )
    if (prevAppointment) {
      await AppointmentModel.findByIdAndUpdate(prevAppointment, {
        status
      })
    }
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
    if (!_consult) {
      return res
        .status(400)
        .json({ msg: 'No se encontro la consulta a eliminar' })
    }
    if (_consult.prev_appointment) {
      await AppointmentModel.findByIdAndUpdate(_consult.prev_appointment, {
        status: 'CANCELED'
      })
    }
    /* Returning the response to the client. */
    return res.status(200).json(_consult)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
