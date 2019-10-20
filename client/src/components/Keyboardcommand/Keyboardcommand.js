import React from 'react'
import './Keyboardcommand.css'
import SynthApp from '../Synth/index'
import Table from '../Table'

export default class Keyboardcommand extends React.Component {
  constructor (props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render () {
    return (
      <div className='keyboardParent'>
        <SynthApp />
      </div>
    )
  }
}
