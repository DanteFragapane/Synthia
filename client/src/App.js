import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Me from './components/Me'
import Synth from './synth/synth-test'
import withAuth from './components/withAuth'

// function testMe () {
//   return <h1>This should only be available after logging in!</h1>
// }

function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/me" component={withAuth(Me)} />
          <Route path="/" component={Synth} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
