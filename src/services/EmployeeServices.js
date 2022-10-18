import { validationResult } from 'express-validator'
import { OAuth2Client } from 'google-auth-library'
import _ from 'lodash'
// Import model
import EmployeeModel from '../models/EmployeeModel.js'

export async function getAll(req, res) {
  try {
    const _data = await EmployeeModel.find({})
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
      return res.status(400).json({ errors: errors.array() })
    }
    const { _id } = req.params
    const _data = await EmployeeModel.findOne({ _id })
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
      return res.status(400).json({ errors: errors.array() })
    }
    const {
      firstName,
      lastName,
      dui,
      isss,
      afp,
      birthday,
      phoneNumber,
      email,
      address,
      department,
      municipality,
      user,
      isActive
    } = req.body
    const _employee = {
      first_name: firstName,
      last_name: lastName,
      dui,
      isss,
      afp,
      birthday,
      phone_number: phoneNumber,
      email,
      address,
      department,
      municipality,
      user,
      is_active: isActive
    }
    const _data = EmployeeModel(_.omitBy(_employee, _.isNull))
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
      return res.status(400).json({ errors: errors.array() })
    }
    const { _id } = req.params
    const { username, password, type, status } = req.body
    const _user = { username, password, type, status }
    const _data = await EmployeeModel.findByIdAndUpdate(
      _id,
      _.omitBy(_user, _.isNull),
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
      return res.status(400).json({ errors: errors.array() })
    }
    const { _id } = req.params
    const _user = await EmployeeModel.findByIdAndRemove(_id)
    /* Returning the response to the client. */
    return res.status(200).json(_user)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
export async function auth(req, res) {
  try {
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
