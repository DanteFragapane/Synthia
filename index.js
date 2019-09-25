// Dotenv package to handle development environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Imports
const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const authenticate = require('./authenticate')
const { hashPassword, checkPassword } = require('./passwordFunctions')
const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET
const app = express()

// MySQL stuff
const mysql = require('mysql')
const connection = mysql.createConnection({
  url: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'websynth'
})

// Define middleware here
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser)
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// Define API routes here
app.post('/api/authenticate', function (req, res) {
  const { username, password } = req.body

  connection.query('SELECT * FROM users WHERE username = ?', username, (err, data) => {
    if (err) {
      console.error(err)
      res.status(500).json({
        error: 'Internal error please try again'
      })
    } else if (!data[0]) {
      res.status(401).json({
        error: 'Incorrect email or password'
      })
    } else {
      if (checkPassword(data[0].password, password)) {
        // Issue token
        const payload = { username }
        const token = jwt.sign(payload, SECRET, {
          expiresIn: '1h'
        })
        res.cookie('token', token, { httpOnly: true }).sendStatus(200)
      } else {
        res.status(401).json({
          error: 'Incorrect email or password'
        })
      }
    }
  })
})

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
})
