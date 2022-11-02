import { validationResult } from 'express-validator'
import { OAuth2Client } from 'google-auth-library'
import axios from 'axios'
// Import model
import CommonUserModel from '../models/CommonUserModel.js'

// Import JWT helper
import { createToken } from '../helpers/jwt.js'

export async function getAll(req, res) {
  try {
    /* A query to the database. */
    const _data = await CommonUserModel.find({})
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
    /* A query to the database. */
    const _data = await CommonUserModel.findOne({ _id })
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
    const { firstName, lastName, email, password, avatar, platform } = req.body
    const _commonUser = instanceUserSchema(
      firstName,
      lastName,
      email,
      password,
      avatar,
      platform
    )
    await _commonUser.save()
    /* Returning the response to the client. */
    return res.status(201).json(_commonUser)
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
    let { email, password, platform, tokenId } = req.body
    // DECLARE VARIABLE COMMON USER
    let _commonUser = null
    // DECLARE VARIABLE IS VERIFIED
    let isVerified = false
    // DECLARE VARIABLES TO HELP REGISTER NEW USER
    let firstName = '',
      lastName = '',
      avatar = ''
    // VERIFY IF WAS LOGGED BY PLATFORM
    switch (platform) {
      case 'GOOGLE':
        const { payload } = await verifyLoginWithGoogle(tokenId)
        /* Verifying if the email is verified by google */
        if (!payload.email_verified) {
          return res
            .status(400)
            .json({ msg: 'No se validó el inicio de sesión' })
        }
        // UPDATE VALUES
        isVerified = true
        email = payload.email
        firstName = payload.given_name
        lastName = payload.family_name
        avatar = payload.picture
        break
      case 'FACEBOOK':
        const { data } = await verifyLoginWithFacebook(tokenId)
        // update values
        isVerified = true
        email = data.email
        firstName = data.first_name
        lastName = data.last_name
        avatar = data?.picture?.data?.url || null
        break
      case 'NATIVE':
        _commonUser = await CommonUserModel.findOne({ email })
        if (!_commonUser)
          return res.status(400).json({ msg: 'Usuario no existe' })

        isVerified = true
        email = _commonUser.email
        firstName = _commonUser.first_name
        lastName = _commonUser.last_name
        avatar = _commonUser.avatar
        break
      default:
        return res
          .status(400)
          .json({ msg: 'No se validó la plataforma de inicio de sesión' })
    }
    // if is verified continue, otherwise return 400
    if (!isVerified) {
      return res.status(400).json({ msg: 'No se validó el inicio de sesión' })
    }
    // FIND USER ON DATABASE IF PLATFORM IS DIFFERENT NATIVE
    if (platform != 'NATIVE') {
      _commonUser = await findOrCreateUserOnDatabase({
        firstName,
        lastName,
        email,
        password,
        avatar,
        platform
      })
    }

    // IF THE COMMON USER HAS ALREADY AN ACCOUNT WITH OTHER PLATFORM
    if (_commonUser.platform !== platform) {
      return res
        .status(400)
        .json({ msg: 'Usuario ya registrado con otra plataforma' })
    }
    // IF COMMON USER IS NATIVE, VERIFY PASSWORD
    if (platform === 'NATIVE' && _commonUser.password !== password) {
      return res.status(400).json({ msg: 'Credenciales incorrectas' })
    }

    // CREATE THE TOKEN
    const _token = createToken(_commonUser)
    return res.status(200).json({
      credential: _token,
      avatar: _commonUser.avatar,
      fullName: `${_commonUser.first_name} ${_commonUser.last_name}`,
      email: _commonUser.email
    })
  } catch (err) {
    /* Returning the response to the client. */
    return res.status(500).json(err)
  }
}

const instanceUserSchema = (values) => {
  const _commonUser = CommonUserModel({
    first_name: values.firstName,
    last_name: values.lastName,
    email: values.email,
    password: values.password,
    avatar: values.avatar,
    platform: values.platform
  })
  return _commonUser
}

const findOrCreateUserOnDatabase = (values) => {
  return new Promise((resolve, reject) => {
    CommonUserModel.findOne({ email: values.email })
      .then(async (data) => {
        // IF THE COMMON USER DOESNT EXISTS, CREATE IT
        if (!data) {
          const _commonUserSchema = instanceUserSchema(values)
          const _commonUser = await _commonUserSchema.save()
          resolve(_commonUser)
        }
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}

/**
 * It takes a tokenId, and returns a promise that resolves to a data object, or
 * rejects with an error.
 * @param tokenId - The tokenId is the token that is sent from the client side.
 * @returns The user's email address and name.
 */
const verifyLoginWithGoogle = async (tokenId) => {
  return new Promise((resolve, reject) => {
    // GET THE GOOGLE CLIENT ID
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const oauth = new OAuth2Client(CLIENT_ID)
    oauth
      .verifyIdToken({
        idToken: tokenId,
        requiredAudience: CLIENT_ID
      })
      .then((data) => {
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}

const verifyLoginWithFacebook = async (tokenId) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `https://graph.facebook.com/me?fields=id,name,first_name,last_name,email,birthday,picture&access_token=${tokenId}`,
      method: 'get'
    })
      .then(({ data }) => {
        resolve({ data })
      })
      .catch((err) => reject(err))
  })
}

