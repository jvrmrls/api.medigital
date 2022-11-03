import { validationResult } from 'express-validator'
import mongoose from 'mongoose'
import _ from 'lodash'
// Import model
import PrescriptionModel from '../models/PrescriptionModel.js'
import ConsultModel from '../models/ConsultModel.js'
import MedicineModel from '../models/MedicineModel.js'

export async function getAll(req, res) {
  try {
    const _data = await PrescriptionModel.find({}).populate(
      'details.medicine',
      { name: 1, owner: 1 }
    )
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function getSpecific(req, res) {
  try {
    const { _id } = req.params
    /* A query to the database. */
    const _data = await PrescriptionModel.findById(_id).populate(
      'details.medicine',
      { name: 1, owner: 1 }
    )
    if (!_data) return res.status(400).json({ msg: 'No se encontró la receta' })
    /* Returning the response to the client. */
    return res.status(200).json(_data)
  } catch (err) {
    console.log(err)
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
    const { consult } = req.body
    // Verify if consult exists
    const _consult = await ConsultModel.findById(consult)
    if (!_consult) return res.status(400).json({ msg: 'La consulta no existe' })
    const _prescription = PrescriptionModel({ consult })
    await _prescription.save()
    return res.status(201).json(_prescription)
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
    const _prescription = await PrescriptionModel.findByIdAndRemove(_id)
    // If the id doesnt exists
    if (!_prescription)
      return res
        .status(400)
        .json({ msg: 'No existe la receta con el ID ' + _id })
    /* Returning the response to the client. */
    return res.status(200).json(_prescription)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function createDetail(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { _id } = req.params
    const { medicine, quantity, dose } = req.body
    // Verify if medicine exists
    const _medicine = await MedicineModel.findById(medicine)
    if (!_medicine) {
      return res.status(400).json({ msg: 'La medicina no existe' })
    }
    const detailToInsert = { medicine, quantity, dose }
    const _prescription = await PrescriptionModel.findById(_id)

    _prescription.details.push(_.omitBy(detailToInsert, _.isNull))
    const response = await _prescription.save()
    return res.status(201).json(response)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

export async function deleteDetail(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { _id, _idDetail } = req.params
    const _prescription = await PrescriptionModel.findByIdAndUpdate(
      _id,
      {
        $pull: {
          details: { _id: mongoose.Types.ObjectId(_idDetail) }
        }
      },
      { new: true }
    )
    if (!_prescription)
      return res.status(400).json({ msg: 'No existe la receta' })
    /* Returning the response to the client. */
    return res.status(200).json(_prescription)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
