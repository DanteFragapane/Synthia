import React, { Component } from 'react'
import "./Login.css"

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push('/')
        } else {
          const error = new Error(res.error)
          throw error
        }
      })
      .catch((err) => {
        console.error(err)
        alert('Error logging in. Please try again')
      })
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Synthia</h2>        
        <div className= " formbox"><h6>Login!</h6>
        <input
          className="username"
          type="text"
          name="username"
          placeholder="Enter username"
          value={this.state.username}
          onChange={this.handleInputChange}
          required
        />
        <input
          className="password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input 
        className="submit"
        type="submit" 
        value="Submit" />
        </div>
      </form>
    )
  }
}
