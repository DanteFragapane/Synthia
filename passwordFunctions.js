const bcrypt = require('bcrypt')
const saltRounds = 10

function hashPassword (password) {
  return bcrypt.hashSync(password, saltRounds)
}

function checkPassword (hashedPassword, currentPassword) {
  return bcrypt.compareSync(currentPassword, hashedPassword)
}

module.exports = { hashPassword, checkPassword }
