import React from 'react'

function logout () {
  fetch('/logout', { method: 'POST', credentials: 'same-origin' })
}

export default class Nav extends React.Component {
  render () {
    if (this.props.username) {
      return (
        <div>
          <p>Hello {this.props.username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )
    }

    return (
      <p>
        Hello! <a href='/login'>Login?</a>
      </p>
    )
  }
}
