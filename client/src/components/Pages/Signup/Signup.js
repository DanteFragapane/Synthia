import React, { Component } from 'react'
import './Signup.css'

export default class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
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
    fetch('/api/createUser', {
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
        alert('Error signing up. Please try again')
      })
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Synthia</h2>
        <div className='formbox'><h6>Singup!</h6>
        <input
          className ='email'
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input
          className ='username'
          type="text"
          name="username"
          placeholder="Enter username"
          value={this.state.username}
          onChange={this.handleInputChange}
          required
        />
        <input
          className ='password'
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input className='submit' type="submit" value="Submit" />
        </div>
        {/* <div className='lilsynth'>
          <div className='fakeheader'></div>
          <div className='screen'>sceen</div>
          
          <div className='pad'>
            <div className='b1'>1</div>
            <div className ='b2'>2</div>
            <div className='b3'>3</div>
            <div className='b4'>4</div>
            <div className='b5'>5</div>
            <div className='b6'>6</div>
            <div className='b7'>7</div>
            <div className='b8'>8</div>
            <div className='b9'>9</div>
            <div className='b10'>10</div>
            <div className='b11'>11</div>
            <div className ='b12'>12</div>
          </div>
          <div className='fakefooter'></div>
        </div> */}
      </form>
      
    )
  }
}
