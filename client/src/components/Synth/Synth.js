import React from 'react'
import WAVEFORMS from './waveForms'
import Frequency from './Frequency'



class Synthesizer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      waveform: WAVEFORMS.SINE.id,
      frequency: 250,
      duration: 500
    }
  }

  makeAudioContext (waveform, frequency, duration) {
    const audioContext = window.audioContext || new AudioContext()
    const oscillator = audioContext.createOscillator()
    const masterGainNode = audioContext.createGain()
    masterGainNode.connect(audioContext.destination)
    oscillator.type = waveform || 'sine'
    oscillator.frequency.value = frequency || 300
    oscillator.connect(masterGainNode)
    oscillator.start()
    duration = duration || 500
    window.setTimeout(oscillator.stop.bind(oscillator), duration)
  }

  componentDidUpdate () {
    console.log(this.state)
  }

  setWaveform = (e) => {
    this.setState({ waveform: e.target.value })
  }

  setDuration = (e) => {
    this.setState({ duration: Number(e.target.value) })
  }

  setFrequency = (value) => {
    this.setState({ frequency: Number(value) })
  }

  playSound = () => {
    // this.props.makeSound(this.state.waveform, this.state.frequency, this.state.duration)
    this.makeAudioContext(this.state.waveform, this.state.frequency, this.state.duration)
    console.log('Playing a sound!')
  }

  render () {
    return (
      <div>
        <h1>Synthesizer</h1>
        <p>Create a tone but be careful</p>

        <div className="control">
          <label htmlFor="waveform">Waveform</label>
          <select id="waveform" value={this.state.waveform} onChange={this.setWaveform}>
            <option value={WAVEFORMS.SINE.id}>{WAVEFORMS.SINE.userTerm}</option>
            <option value={WAVEFORMS.SAWTOOTH.id}>{WAVEFORMS.SAWTOOTH.userTerm}</option>
            <option value={WAVEFORMS.TRIANGLE.id}>{WAVEFORMS.TRIANGLE.userTerm}</option>
            <option value={WAVEFORMS.SQUARE.id}>{WAVEFORMS.SQUARE.userTerm}</option>
          </select>
        </div>

        <Frequency value={this.state.frequency} updateFrequency={this.setFrequency} />

        <div className="control">
          <label htmlFor="duration">Duration (milliseconds)</label>
          <input id="duration" type="text" value={this.state.duration} onChange={this.setDuration} />
        </div>

        <button onClick={this.playSound}>Play!</button>
      </div>
    )
  }
}

export default Synthesizer

// function Synth () {
//   // this creates the audio context
//   const context = new (window.AudioContext || window.webkitAudioContext)()

//   // creates the repeating ocillator
//   // OscillatorNode.type = 'sine' | 'square' | 'triangle' | 'sawtooth'

//   const oscillator = context.createOscillator()

//   oscillator.type = 'square, triangle, sawtooth'
//   oscillator.frequency.value = 220
//   oscillator.connect(context.destination)
//   oscillator.start()

//   return (
//     <div className='synth'>farts</div>
//   )
// }

// export default Synth

// ++==++== - - Basic Synth ^
