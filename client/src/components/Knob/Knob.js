import React from 'react'
import './Knob.css'

class Knob extends React.Component {
  constructor (props) {
    super()
    this.state = { value: 3, max: props.max, min: props.min }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    return (
      <div className="slidecontainer">
        <label className="slidecontainer">
          <input
            id="typeinp"
            type="range"
            className="slider"
            min={this.state.min}
            max={this.state.max}
            value={this.state.value}
            onChange={this.handleChange}
            step=".25"
          />
          {this.state.value}
        </label>
      </div>
    )
  }
}

export default Knob
