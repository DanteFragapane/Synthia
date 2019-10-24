import React from 'react'
import './Knob.css'

class Knob extends React.Component {
  constructor (props) {
    super()
    this.state = { step: props.step, value: props.defaultValue, max: props.max, min: props.min }
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
            min={this.state.min}
            max={this.state.max}
            value={this.state.value}
            onChange={(e) => {
              this.setState({ value: e.target.value })
              this.props.onChange(e)
            }}
            step={this.state.step}
          />
          {this.state.value}
        </label>
      </div>
    )
  }
}

export default Knob
