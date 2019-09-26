import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Synth from './synth/synth-test'
import withAuth from './components/withAuth'

function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/me" component={withAuth(<h1>Me! This should only be avaiable AFTER logging in!</h1>)} />
          <Route path="/" component={Synth} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
