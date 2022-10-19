import { validationResult } from 'express-validator'
import _ from 'lodash'
// Import model
import UserModel from '../models/UserModel.js'
import EmployeeModel from '../models/EmployeeModel.js'

// Import JWT helper
import { createToken } from '../helpers/jwt.js'

export async function getAll(req, res) {
  try {
    /* A query to the database. */
    const _data = await UserModel.find({})
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
    const _data = await UserModel.findOne({ _id })
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
    const { username, password, type, status } = req.body
    const _user = { username, password, type, status }
    const _data = UserModel(_.omitBy(_user, _.isNull))
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
    const { username, password, type, status } = req.body
    const _user = { username, password, type, status }
    const _data = await UserModel.findByIdAndUpdate(
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
      return res.status(422).json({ errors: errors.array() })
    }
    const { _id } = req.params
    const _user = await UserModel.findByIdAndRemove(_id)
    /* Returning the response to the client. */
    return res.status(200).json(_user)
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}
export async function auth(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { username, password } = req.body
    const _user = await UserModel.findOne({ username })
    if (!_user) {
      return res.status(400).json({ msg: 'Credenciales incorrectas' })
    }
    /* Checking if the password is correct. */
    if (!verifyPassword(password, _user.password)) {
      return res.status(400).json({ msg: 'Credenciales incorrectas' })
    }
    //Get the employee with this user
    const _employee = await EmployeeModel.findOne({ user: _user._id }).populate(
      'user',
      { password: 0, status: 0, createdAt: 0, updatedAt: 0 }
    )
    const tokenId = createToken(_employee)
    return res.status(200).json({ credential: tokenId })
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

const verifyPassword = (pass, hash) => {
  return pass === hash
}
