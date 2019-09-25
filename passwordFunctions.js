const bcrypt = require('bcrypt')
const saltRounds = 10

export function hashPassword (password) {
  return bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return false
    return hash
  })
}

export function checkPassword (hashedPassword, currentPassword) {
  return bcrypt.compare(currentPassword, hashedPassword, (err, bool) => {
    if (err) return false
    return bool
  })
}
