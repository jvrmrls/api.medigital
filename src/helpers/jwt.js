import jwt from 'jsonwebtoken'

const _SECRET = process.env.JWT_SECRET_KEY
const _EXPIRES_IN = process.env.JWT_EXPIRES_IN
const _REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN
const _COMPANY = process.env.COMPANY
/**
 * This function takes in a data object, converts it to JSON, and then signs it
 * with the secret key.
 * @param data - The data to be encoded.
 * @returns A token
 */
const createToken = (data) => {
  return jwt.sign(data, _SECRET, {
    expiresIn: _EXPIRES_IN
  })
}

/**
 * Esta función genera un refresh token.
 * @param data - Los datos a codificar.
 * @returns Un refresh token.
 */
const createRefreshToken = (data) => {
  return jwt.sign(data.toJSON(), _SECRET, {
    expiresIn: _REFRESH_EXPIRES_IN
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

/**
 * Decodifica un refresh token.
 * @param token - El refresh token a decodificar.
 * @returns El token decodificado.
 */
const decodeRefreshToken = (token) => {
  return jwt.verify(token, _SECRET)
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)
  jwt.verify(token, _SECRET, (err, user) => {
    if (err) {
      // Si tiene header refresk-token, lo decodifica y lo verifica y si pasa, crea un nuevo token y lo devuelve como header

      const refreshToken = req.headers['x-refresh-token']
      if (refreshToken == null) return res.sendStatus(403)
      jwt.verify(refreshToken, _SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        delete user.iat
        delete user.exp
        const newToken = createToken(user)
        res.setHeader('tokenid', newToken)
        res.setHeader('refreshtoken', refreshToken)
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, x-refresh-token, Content-Type'
        )
        res.header('Access-Control-Expose-Headers', 'tokenid, refreshtoken')
      })
      return res.sendStatus(403)
    }
    req.user = user
    req.company = user?.company ?? _COMPANY
    next()
  })
}

export { createToken, decodeToken, createRefreshToken, authenticateToken }
