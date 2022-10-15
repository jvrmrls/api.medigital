import { validationResult } from 'express-validator'
import { OAuth2Client } from 'google-auth-library'
// Import model
import CommonUserModel from '../models/CommonUserModel.js'

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
      return res.status(400).json({ errors: errors.array() })
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
      return res.status(400).json({ errors: errors.array() })
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
      return res.status(400).json({ errors: errors.array() })
    }
    let { email, password, platform, tokenId } = req.body
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
            .json({ message: 'No se validó el inicio de sesión' })
        }
        // UPDATE VALUES
        isVerified = true
        email = payload.email
        firstName = payload.given_name
        lastName = payload.family_name
        avatar = payload.picture
        break
      case 'FACEBOOK':
        console.log('logged by facebook')
        break
      case 'NATIVE':
        isVerified = true
        break
      default:
        return res
          .status(400)
          .json({ message: 'No se validó la plataforma de inicio de sesión' })
    }
    // if is verified continue, otherwise return 400
    if (!isVerified) {
      return res
        .status(400)
        .json({ message: 'No se validó el inicio de sesión' })
    }
    // FIND USER ON DATABASE
    const _commonUser = await findOrCreateUserOnDatabase({
      firstName,
      lastName,
      email,
      password,
      avatar,
      platform
    })
    console.log('common', _commonUser)

    // IF THE COMMON USER HAS ALREADY AN ACCOUNT WITH OTHER PLATFORM
    if (_commonUser.platform !== platform) {
      return res
        .status(400)
        .json({ message: 'Usuario ya registrado con otra plataforma' })
    }
    // IF THE COMMON USER PLATFORM IS NATIVE, VALIDATE PASSWORD
    if (platform === 'NATIVE') {
      // COMPARE PASSWORDS
      if (_commonUser.password !== password) {
        return res.status(400).json({ message: 'Credenciales incorrectas' })
      }
    }

    return res.status(200).json(_commonUser)
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

const createToken = (email) => {}

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
