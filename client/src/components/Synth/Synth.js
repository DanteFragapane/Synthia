import React from 'react'
import WAVEFORMS from './waveForms'
import Frequency from './Frequency'
import './Synth.css'
const EnvGen = require('fastidious-envelope-generator')

// The main class
export default class Synthesizer extends React.Component {
  constructor (props) {
    super(props)
    this.keys = [
      { name: 'C', freq: 261.63 },
      { name: 'C#', freq: 277.18 },
      { name: 'D', freq: 293.66 },
      { name: 'D#', freq: 311.13 },
      { name: 'E', freq: 329.63 },
      { name: 'F', freq: 349.23 },
      { name: 'F#', freq: 369.99 },
      { name: 'G', freq: 392.0 },
      { name: 'G#', freq: 415.3 },
      { name: 'A', freq: 440.0 },
      { name: 'A#', freq: 466.16 },
      { name: 'B', freq: 493.88 },
      { name: 'C1', freq: 523.25 }
    ]
    this.state = {
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
    this.createAudio()
  }

  createContexts = () => {
    const audioCtx = window.AudioContext || window.webkitAudioContext
    this.audioContext = new audioCtx()
  }

  createAudio = () => {
    this.oscillator = this.audioContext.createOscillator()
    this.filter = this.audioContext.createBiquadFilter()
    this.masterGainNode = this.audioContext.createGain()
    this.envGainNode = this.audioContext.createGain()
    this.masterGainNode.gain.value = 0
    this.envGainNode.gain.value = 0

    // this.adsr = new EnvGen(this.audioContext, this.envGainNode.gain)
    this.adsr = new EnvGen(this.audioContext, this.masterGainNode.gain)

    // Start setting up the components
    this.oscillator.type = this.state.waveform || 'sine'
    this.oscillator.frequency.value = this.state.frequency || 440
    this.filter.type = this.state.filterType
    this.filter.frequency.setValueAtTime(this.state.filterFrequency, this.audioContext.currentTime)
    this.filter.gain.setValueAtTime(this.state.filterGain, this.audioContext.currentTime)

    //ASDR +++++++++++++++++++++++++++++++++
    this.adsr.mode = 'ADSR'
    this.adsr.attackTime = this.state.attackTime
    this.adsr.decayTime = this.state.decayTime
    this.adsr.sustainLevel = this.state.sustainLevel
    this.adsr.releaseTime = this.state.releaseTime
    //ASDR +++++++++++++++++++++++++++++++++

    // Connect the nodes
    this.oscillator.connect(this.filter)
    this.filter.connect(this.masterGainNode)
    this.masterGainNode.connect(this.audioContext.destination)
    this.envGainNode.connect(this.masterGainNode.gain)

    this.oscillator.start(this.audioContext.currentTime)
  }

  componentDidMount () {
    // Call the main createAudio function
    this.createContexts()
  }

  componentDidUpdate () {
    // this.restartAudio()
    this.createAudio()
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

  playSound = (freq) => {
    // if (this.state.frequency !== freq) {
    //   this.setState({ frequency: Number(freq) })
    // }
    this.setState({ frequency: Number(freq) })
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
          <button onMouseUp={this.stopSound} onMouseDown={this.playSound.bind(this, 440)}>
            create keyboard
          </button>
          <div className="keyMaker">
            {this.keys.map((key) => (
              <div className={key.name} key={key.name} data-freq={key.freq}>
                <button onMouseUp={this.stopSound} onMouseDown={this.playSound.bind(this, key.freq)}>
                  {key.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
