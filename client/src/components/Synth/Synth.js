import React from "react"
import WAVEFORMS from "./waveForms"
import Frequency from "./Frequency"
import "./Synth.css"
import createGrapher from "./grapher"
import MidiInterface from './MidiInterface'

const EnvGen = require('fastidious-envelope-generator')

// The main class
export default class Synthesizer extends React.Component {
  constructor (props) {
    super(props)

    this.keys = [
      { name: 'C', freq: 261.63, keyLetter: 'A' },
      { name: 'CSH', freq: 277.18, keyLetter: 'W' },
      { name: 'D', freq: 293.66, keyLetter: 'S' },
      { name: 'DSH', freq: 311.13, keyLetter: 'E' },
      { name: 'E', freq: 329.63, keyLetter: 'D' },
      { name: 'F', freq: 349.23, keyLetter: 'F' },
      { name: 'FSH', freq: 369.99, keyLetter: 'T' },
      { name: 'G', freq: 392.0, keyLetter: 'G' },
      { name: 'GSH', freq: 415.3, keyLetter: 'Y' },
      { name: 'A', freq: 440.0, keyLetter: 'H' },
      { name: 'ASH', freq: 466.16, keyLetter: 'U' },
      { name: 'B', freq: 493.88, keyLetter: 'J' },
      { name: 'C1', freq: 523.25, keyLetter: 'K' },
      { name: 'UP', freq: 0, keyLetter: 'UP' },
      { name: 'x2', freq: 0, keyLetter: 'x' },
      { name: 'x3', freq: 0, keyLetter: 'x' },
      { name: 'x4', freq: 0, keyLetter: 'x' },
      { name: 'x5', freq: 0, keyLetter: 'x' },
      { name: 'x6', freq: 0, keyLetter: 'x' },
      { name: 'x7', freq: 0, keyLetter: 'x' },
      { name: 'x8', freq: 0, keyLetter: 'x' },
      { name: 'x9', freq: 0, keyLetter: 'x' },
      { name: 'x10', freq: 0, keyLetter: 'x' },
      { name: 'x11', freq: 0, keyLetter: 'x' },
      { name: 'x12', freq: 0, keyLetter: 'x' },
      { name: 'DN', freq: 0, keyLetter: 'DN' }
    ]

    this.state = {
      waveform: WAVEFORMS.SQUARE.id,
      filterType: 'lowpass',
      filterFrequency: 375,
      filterGain: 50,
      attackTime: 0.2,
      decayTime: 0.5,
      sustainLevel: 0.5,
      releaseTime: 0.3,
      delayTime: 0.5
    }

    this.frequency = 220
  }

  restartAudio = () => {
    this.createAudio()
  }

  createContexts = () => {
    this.midi = new MidiInterface({
      onPressNote: (evt) => this.playSound(this.midi.frequencyFromNote(evt)),
      onReleaseNote: (evt) => this.stopSound()
    })

    const audioCtx = window.AudioContext || window.webkitAudioContext
    this.audioContext = new audioCtx()
  }

  createAudio = () => {
    //MASTER GAINN NODE
    this.masterGainNode = this.audioContext.createGain()
    this.masterGainNode.gain.value = 0
    //MASTER GAINN NODE

    //OSCILLATOR
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.type = this.state.waveform || 'sine'
    this.oscillator.frequency.value = this.frequency || 440
    //OSCILLATOR

    //FILTER
    this.filter = this.audioContext.createBiquadFilter()
    this.filter.type = this.state.filterType || 'lowpass'
    this.filter.frequency.setValueAtTime(this.state.filterFrequency, this.audioContext.currentTime)
    this.filter.gain.setValueAtTime(this.state.filterGain, this.audioContext.currentTime)
    //FILTER

    //ASDR
    this.adsr = new EnvGen(this.audioContext, this.masterGainNode.gain)
    this.adsr.mode = 'ADSR'
    this.adsr.attackTime = this.state.attackTime
    this.adsr.decayTime = this.state.decayTime
    this.adsr.sustainLevel = this.state.sustainLevel
    this.adsr.releaseTime = this.state.releaseTime
    //ASDR

    // Connect the nodes 
    
    this.grapherNode = createGrapher(this.audioContext, document.querySelector('#env-graph'), 2048)
    console.log(this.grapherNode)
    this.oscillator.connect(this.filter)
    this.filter.connect(this.masterGainNode)
    this.grapherNode.connect(this.audioContext.destination)
    this.masterGainNode.connect(this.grapherNode)

    // Start 'er up!
    this.oscillator.start()
  }

  componentDidMount () {
    // Call the main createAudio function
    this.createContexts()
    this.setState({
      filterFrequency: 500,
      filterGain: 50,
      attackTime: 0.2,
      decayTime: 0.5,
      sustainLevel: 0.5,
      releaseTime: 0.3,
      delayTime: 0.5
    })
    createGrapher(this.audioContext, document.querySelector('#env-graph'), 1024)
  }

  componentWillUnmount () {
    this.oscillator = null
    this.filter = null
    this.adsr = null
    this.masterGainNode = null
  }

  setWaveform = (e) => {
    this.setState({ waveform: e.target.value })
  }

  setFrequency = (value) => {
    this.frequency = Number(value)
    this.createAudio()
  }

  playSound = (freq) => {
    this.setFrequency(freq)
    this.adsr.gateOn(this.audioContext.currentTime)
    
  }

  keyPlaySound2 = (event) => {
    switch (event.key) {
      case 'a':
        this.playSound(261.63)
        console.log('a key was pressed')
        break
      case 'w':
        this.playSound(277.18)
        console.log('w key was pressed')
        break
      case 's':
        this.playSound(293.66)
        console.log('s key was pressed')
        break
      case 'e':
        this.playSound(311.13)
        console.log('e key was pressed')
        break
      case 'd':
        this.playSound(329.63)
        console.log('d key was pressed')
        break
      case 'f':
        this.playSound(349.23)
        console.log('f key was pressed')
        break
      case 't':
        this.playSound(369.99)
        console.log('t key was pressed')
        break
      case 'g':
        this.playSound(392.0)
        console.log('g key was pressed')
        break
      case 'y':
        this.playSound(415.3)
        console.log('y key was pressed')
        break
      case 'h':
        this.playSound(440.0)
        console.log('h key was pressed')
        break
      case 'u':
        this.playSound(466.16)
        console.log('u key was pressed')
        break
      case 'j':
        this.playSound(493.88)
        console.log('j key was pressed')
        break
      case 'k':
        this.playSound(523.25)
        console.log('k key was pressed')
        break

      default:
        console.log('wrong key')
    }
  }

  stopSound = () => {
    this.adsr.gateOff(this.audioContext.currentTime)
  }

  test = (freq) => {
    console.log(freq)
    this.setFrequency(freq)
    this.adsr.gateOn(this.audioContext.currentTime)
  }

  render () {
    return (
      <div className="synth__all" id="keyboardDiv" onKeyDown={this.keyPlaySound2} onKeyUp={this.stopSound}>
        
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

        <div id="keyboard">
        
          <div />
          <button className='boton' onMouseDown={this.stopSound}>STOP SOUND</button>
          <div className="keyMaker">
            {this.keys.map((key) => (
              <div className={key.name} key={key.name} data-freq={key.freq}>
                <button
                  className="buton2"
                  onMouseUp={this.stopSound}
                  onMouseDown={this.playSound.bind(this, key.freq)}
                  onTouchStart={this.playSound.bind(this, key.freq)}
                  onTouchEnd={this.stopSound}
                  onTouchCancel={this.stopSound}
                >
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
