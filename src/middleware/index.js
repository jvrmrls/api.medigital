import jwt from 'jsonwebtoken'

const _SECRET = process.env.JWT_SECRET_KEY
const _EXPIRES_IN = process.env.JWT_EXPIRES_IN
const _COMPANY = process.env.COMPANY

export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, _SECRET, (err, user) => {
    if (err) {
      // Si tiene header refresk-token, lo decodifica y lo verifica y si pasa, crea un nuevo token y lo devuelve como header
      return res.sendStatus(403)
    }
    req.user = user
    req.company = user?.company ?? _COMPANY
    next()
  })
}

export default authenticate
