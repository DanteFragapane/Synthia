const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = function authenticate (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token
  if (!token) {
    res.status(401).send('Unauthorized: No token provided')
  } else {
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token')
      } else {
        req.username = decoded.username
        next()
      }
    })
  }
}
