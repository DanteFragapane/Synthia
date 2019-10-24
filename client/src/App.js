import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Login from './components/Pages/Login/Login'
import Signup from './components/Pages/Signup/Signup'
import withAuth from './components/withAuth'
import Main from './components/Pages/Main'

class App extends React.Component {
  state = {
    username: '',
    loggedIn: false
  }

  updateUser = function () {
    fetch('/api/getCurrentUser')
      .then((res) => {
        if (res.status === 200) return res.json()
        return { username: null }
      })
      .then((json) => {
        if (json.username) {
          return this.setState({ username: json.username, loggedIn: true })
        }
        return
      })
  }

  componentDidMount () {
    this.updateUser()
  }

  render () {
    return (
      <Router>
        <Nav username={this.state.username} />
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={withAuth(Main)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
