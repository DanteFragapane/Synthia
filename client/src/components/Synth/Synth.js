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

// The main class
export default class Synthesizer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      state: 'suspended',
      waveform: WAVEFORMS.SAWTOOTH.id,
      frequency: 250,
      duration: 1000,
      filterType: 'lowpass',
      filterFrequency: 500,
      filterGain: 50,
      attackTime: 0.1,
      decayTime: 0.1,
      sustainLevel: 0.1,
      releaseTime: 0.1
    }
  }

  restartAudio = () => {
    this.oscillator.stop(this.audioContext.currentTime)
    this.createAudio()
  }

  createAudio = () => {
    // Create the components
    //    Only the audioContext needs to be attached to the object
    const audioCtx = window.AudioContext || window.webkitAudioContext
    this.audioContext = new audioCtx()
    this.oscillator = this.audioContext.createOscillator()
    this.filter = this.audioContext.createBiquadFilter()
    this.masterGainNode = this.audioContext.createGain()
    this.masterGainNode.gain.value = 0
    this.envGainNode = this.audioContext.createGain()
    this.envGainNode.gain.value = 0

    // Start setting up the components
    this.oscillator.type = this.state.waveform || 'sine'
    this.oscillator.frequency.value = this.state.frequency || 300
    this.filter.type = this.state.filterType
    this.filter.frequency.setValueAtTime(this.state.filterFrequency, this.audioContext.currentTime)
    this.filter.gain.setValueAtTime(this.state.filterGain, this.audioContext.currentTime)

    //ASDR +++++++++++++++++++++++++++++++++

    const EnvGen = require('fastidious-envelope-generator')

    this.adsr = new EnvGen(this.audioContext, this.envGainNode.gain)

    this.adsr.mode = 'ADSR'
    this.adsr.attackTime = this.state.attackTime
    this.adsr.decayTime = this.state.decayTime
    this.adsr.sustainLevel = this.state.sustainLevel
    this.adsr.releaseTime = this.state.releaseTime

    //ASDR +++++++++++++++++++++++++++++++++

    // Constant Node code ???
    // Made into a function for scope reasons
    function createConstantNode (audioContext, v) {
      const constantBuffer = audioContext.createBuffer(1, 2, audioContext.sampleRate)
      const constantData = constantBuffer.getChannelData(0)
      constantData[0] = v
      constantData[1] = v
      const node = audioContext.createBufferSource()
      node.buffer = constantBuffer
      node.loop = true
      node.start()
      return node
    }

    // Constant Node
    this.constNode = createConstantNode(this.audioContext, 1)

    // Connect the nodes
    this.oscillator.connect(this.filter)
    this.filter.connect(this.masterGainNode)
    this.masterGainNode.connect(this.audioContext.destination)
    this.constNode.connect(this.envGainNode)
    this.envGainNode.connect(this.masterGainNode.gain)

    this.oscillator.start()
  }

  componentDidMount () {
    // Call the main createAudio function
    this.createAudio()
  }

  componentDidUpdate () {
    this.restartAudio()
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

  setAttackTime = (a) => {
    this.setState({ attackTime: Number(a.target.value) })
  }

  setDecayTime = (d) => {
    this.setState({ decayTime: Number(d.target.value) })
  }

  setSustainLevel = (s) => {
    this.setState({ sustainLevel: Number(s.target.value) })
  }

  setReleaseTime = (r) => {
    this.setState({ releaseTime: Number(r.target.value) })
  }

  playSound = () => {
    this.adsr.gateOn(this.audioContext.currentTime)
  }

  stopSound = () => {
    this.adsr.gateOff(this.audioContext.currentTime)
  }

  render () {
    return (
      <div className="synth__all">
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
        <div className="control">
          <label htmlFor="attack">Attack</label>
          <input id="attack" type="text" value={this.state.attackTime} onChange={this.setAttackTime} />
        </div>
        <div className="control">
          <label htmlFor="decay">Decay</label>
          <input id="decay" type="text" value={this.state.decayTime} onChange={this.setDecayTime} />
        </div>
        <div className="control">
          <label htmlFor="sustain">Sustain</label>
          <input id="sustain" type="text" value={this.state.sustainLevel} onChange={this.setSustainLevel} />
        </div>
        <div className="control">
          <label htmlFor="release">Release</label>
          <input id="release" type="text" value={this.state.releaseTime} onChange={this.setReleaseTime} />
        </div>
        <div id="keyboard">
          <div />
          <button onMouseUp={this.stopSound} onMouseDown={this.playSound}>
            create keyboard
          </button>
        </div>
      </div>
    )
  }
}

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
