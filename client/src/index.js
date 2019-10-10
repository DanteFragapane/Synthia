import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Knob from '../src/components/Knob'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

// ReactDOM.render(<Knob />, document.querySelector('body'))
