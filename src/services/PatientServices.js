import { validationResult } from 'express-validator'
import mongoose from 'mongoose'
import _ from 'lodash'

// Import model
import PatientModel from '../models/PatientModel.js'
import ConsultModel from '../models/ConsultModel.js'

/**
 * It's a function that returns a response to the client.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response to the client.
 */
export async function getAll(req, res) {
  try {
    /* A query to the database. */
    const _data = await PatientModel.find({})
      .populate('department', { _id: 0 })
      .populate('municipality', { cantons: 0, _id: 0, postalCode: 0 })
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function getSpecific(req, res) {
  try {
    /* A query to the database. */
    const _data = await PatientModel.findOne(req.id)
      .populate('department', { _id: 0 })
      .populate('municipality', { cantons: 0, _id: 0, postalCode: 0 })
    if (!_data)
      return res.status(400).json({ msg: 'No se encontró el paciente' })
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
    const {
      firstName,
      lastName,
      phoneNumber,
      birthday,
      gender,
      dui,
      address,
      department,
      municipality,
      maritalStatus,
      bloodType,
      familyHistory,
      personalHistory,
      responsibles
    } = req.body
    const _patient = PatientModel({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      birthday,
      gender,
      dui,
      address,
      department,
      municipality,
      marital_status: maritalStatus,
      blood_type: bloodType,
      family_history: familyHistory,
      personal_history: personalHistory,
      responsibles
    })
    await _patient.save()
    /* Returning the response to the client. */
    return res.status(201).json(_patient)
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
      firstName,
      lastName,
      phoneNumber,
      birthday,
      gender,
      dui,
      address,
      department,
      municipality,
      maritalStatus,
      bloodType,
      familyHistory,
      personalHistory,
      responsibles
    } = req.body
    const _patient = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      birthday,
      gender,
      dui,
      address,
      department,
      municipality,
      marital_status: maritalStatus,
      blood_type: bloodType,
      family_history: familyHistory,
      personal_history: personalHistory,
      responsibles
    }
    const _data = await PatientModel.findByIdAndUpdate(
      _id,
      _.omitBy(_patient, _.isNull),
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
    /* A query to the database. */
    const _patient = await PatientModel.findByIdAndRemove(_id)
    /* Returning the response to the client. */
    return res.status(200).json(_patient)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function addResponsible(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { _id } = req.params
    const { firstName, lastName, phoneNumber, kinship } = req.body
    const responsible = {
      _id: new mongoose.Types.ObjectId(),
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      kinship
    }
    /* A query to the database. */
    const _patient = await PatientModel.findById(_id)
    _patient.responsibles.push(responsible)
    const _data = await _patient.save()
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    console.log(err)
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function deleteResponsible(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { _id, responsible } = req.params
    const { responsibles } = await PatientModel.findById(_id)
    /* It's checking if the responsible exists. */
    const exists = responsibles.find((element) => (element._id = responsible))
    if (!exists) {
      return res.status(400).json({ msg: 'Responsable a eliminar no existe' })
    }
    /* A query to the database. */
    const _patient = await PatientModel.findOneAndUpdate(
      _id,
      {
        $pull: {
          responsibles: {
            _id: mongoose.Types.ObjectId(responsible)
          }
        }
      },
      {
        new: true
      }
    )
    /* Returning the response to the client. */
    return res.status(200).json(_patient)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function getAllInfoByDui(req, res) {
  try {
    /* A query to the database. */
    const { dui } = req.params
    const { company } = req
    const duiFormat = (dui?.length === 9) ? `${dui.slice(0, 8)}-${dui.slice(8)}` : dui
    const _patient = await PatientModel.findOne({ dui: duiFormat })
      .populate('department', { _id: 0 })
      .populate('municipality', { cantons: 0, _id: 0, postalCode: 0 })
    if (!_patient)
      return res.status(400).json({ msg: 'No se encontró el paciente' })
    /* If exists patient, get the history of consults */
    const _consults = await ConsultModel.find({ patient: _patient._id, company })
      .select('-patient -status -_id -company -createdAt -updatedAt -__v')
      .sort({ date: -1 })
      .populate('diagnostic', { _id: 0 })

    

    const response = {
      patient: _patient,
      consults: _consults,
      notes: [],
      documents: []
    }
    /* Returning the response to the client. */
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
