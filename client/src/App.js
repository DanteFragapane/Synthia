import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import Login from './components/Login'
import Signup from './components/Signup'
import Me from './components/Me'
import Synth from './components/Synth'
import withAuth from './components/withAuth'
import Main from './components/Pages/Main'

function App () {
  return (
    <Router>
      <Main />
      <div>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/me' component={withAuth(Me)} />
          <Route path='/' component={Synth} />
          <Route path='/main' component={Main} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
