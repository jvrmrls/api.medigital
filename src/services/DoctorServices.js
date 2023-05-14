import { validationResult } from 'express-validator'
import _ from 'lodash'
// Import model
import DoctorModel from '../models/DoctorModel.js'

export async function getAll(req, res) {
  try {
    const _data = await DoctorModel.find({}).populate({
      path: 'employee',
      select: 'first_name last_name dui phone_number email company',
      populate: { path: 'company', select: 'name' }
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
    const _data = await DoctorModel.findOne({ _id }).populate({
      path: 'employee',
      select: 'first_name last_name dui phone_number email company',
      populate: { path: 'company', select: 'name' }
    })
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
    const { employee, specialties, jvpm, type } = req.body
    const _doctor = {
      employee,
      specialties,
      jvpm,
      type
    }
    const _data = DoctorModel(_.omitBy(_doctor, _.isNull))
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
    const { employee, specialties, jvpm, type } = req.body
    const _doctor = {
      employee,
      specialties,
      jvpm,
      type
    }
    const _data = await DoctorModel.findByIdAndUpdate(
      _id,
      _.omitBy(_doctor, _.isNull),
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
    const _doctor = await DoctorModel.findByIdAndRemove(_id)
    /* Returning the response to the client. */
    return res.status(200).json(_doctor)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
