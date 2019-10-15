import React from 'react'
import './Knob.css'

class Knob extends React.Component {
  constructor () {
    super()
    this.state = { value: 3 }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    return (
      <div className='slidecontainer'>
        <label className='slidecontainer'>
          <input
            id='typeinp'
            type='range'
            className='slider'
      
            min='0' max='100'
            value={this.state.value}
            onChange={this.handleChange}
            step='.25' />
          {this.state.value}
        </label>
      </div>
    )
  }
}

export default Knob
