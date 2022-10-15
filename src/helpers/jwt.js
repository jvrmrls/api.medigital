import jwt from 'jsonwebtoken'

const _SECRET = process.env.JWT_SECRET_KEY
const _EXPIRES_IN = process.env.JWT_EXPIRES_IN
/**
 * This function takes in a data object, converts it to JSON, and then signs it
 * with the secret key.
 * @param data - The data to be encoded.
 * @returns A token
 */
const createToken = (data) => {
  return jwt.sign(data.toJSON(), _SECRET, {
    expiresIn: _EXPIRES_IN
  })
}

/**
 * It takes a token, and returns the decoded token.
 * @param token - The token to decode
 * @returns The decoded token.
 */
const decodeToken = (token) => {
  return jwt.verify(token, _SECRET)
}

export { createToken, decodeToken }
