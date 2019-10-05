import React from 'react'
import WAVEFORMS from './waveForms'
import Frequency from './Frequency'
import './Synth.css'
const keyArray = [ 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0, 466.16, 493.88, 523.25 ]
const keyName = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C' ]

function keyMaker () {
  for (let i = 0; i < keyArray.length; i++) {
    const button = document.createElement('input')
    button.type = 'button'
    button.value = keyName[i]
    button.id = keyArray[i]
    document.body.appendChild(button)
  }
}

keyMaker()

class Synthesizer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      waveform: WAVEFORMS.SAWTOOTH.id,
      frequency: 250,
      duration: 500,
      filterType: 'lowpass',
      filterFrequency: 250,
      filterGain: 100
    }
  }

  makeAudioContext () {
    // Create the components
    const audioContext = window.audioContext || new AudioContext()
    const oscillator = audioContext.createOscillator()
    const filter = audioContext.createBiquadFilter()
    const masterGainNode = audioContext.createGain()

    // Start setting up the components
    oscillator.type = this.state.waveform || 'sine'
    oscillator.frequency.value = this.state.frequency || 300
    filter.type = this.state.filterType
    filter.frequency.setValueAtTime(this.state.filterFrequency, audioContext.currentTime)
    filter.gain.setValueAtTime(this.state.filterGain, audioContext.currentTime)

    // Connect the nodes
    oscillator.connect(filter)
    filter.connect(masterGainNode)
    masterGainNode.connect(audioContext.destination)

    // Start the oscillator
    oscillator.start()
    duration = this.state.duration || 500
    window.setTimeout(oscillator.stop.bind(oscillator), duration)
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

  setFilterFrequency = (value2) => {
    this.setState({ filterFrequency: Number(value2.target.value) })
  }

  setFilterGain = (value3) => {
    this.setState({ filterGain: Number(value3.target.value) })
  }

  componentDidUpdate () {
    console.log(this.state)
  }

  playSound = () => {
    this.makeAudioContext()
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
        <div className="control">
          <label htmlFor="filterFreq">Filter Frequency</label>
          <input id="filterFreq" type="text" value={this.state.filterFrequency} onChange={this.setFilterFrequency} />
        </div>
        <div className="control">
          <label htmlFor="filterGain">Filter Gain</label>
          <input id="filterGain" type="text" value={this.state.filterGain} onChange={this.setFilterGain} />
        </div>
        <div id="keyboard">
          <div />
          <button onClick={this.playSound}>create keyboard</button>
        </div>
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
