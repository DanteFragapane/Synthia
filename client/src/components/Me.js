import React from 'react'

// MySQL stuff
// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: process.env.dbHots || 'localhost',
//   port: process.env.dbPort || 3306,
//   user: process.env.dbUser || 'root',
//   password: process.env.dbPassword || 'password',
//   database: process.env.dbDatabase || 'websynth'
// })

export default class Me extends React.Component {
  render () {
    // connection.query('SELECT * FROM profiles WHERE username === ?', this.props.match.params.user)
    // connection.query('SELECT * FROM profiles WHERE username === ?', this.user)
    return <h1>Hello {this.props.match.params.user}! This should only be available after logging in!</h1>
  }
}
