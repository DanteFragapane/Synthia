const bcrypt = require('bcrypt')
const saltRounds = 10

function hashPassword (password) {
  return bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return false
    return hash
  })
}

function checkPassword (hashedPassword, currentPassword) {
  return bcrypt.compare(currentPassword, hashedPassword, (err, bool) => {
    if (err) return false
    return bool
  })
}

module.exports = { hashPassword, checkPassword }
