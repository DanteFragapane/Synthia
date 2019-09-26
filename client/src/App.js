import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Synth from './synth/synth-test'

function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Synth} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
