const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

export default function authenticate (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token
  if (!token) {
    res.status(401).send('Unauthorized: No token provided')
  } else {
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token')
      } else {
        req.email = decoded.email
        next()
      }
    })
  }
}
