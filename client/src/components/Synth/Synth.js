import React from 'react'
import WAVEFORMS from './waveForms'
import Frequency from './Frequency'
import './Synth.css'
import createGrapher from './grapher'
import MidiInterface from './MidiInterface'
import { ValuesContext } from '../Pages/Main/ValuesContext'
import Table from '../Table'

const EnvGen = require('fastidious-envelope-generator')

// The main class
export default class Synthesizer extends React.Component {
  constructor (props) {
    super(props)
    this.playing = []
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
      { name: 'x2', freq: 0, keyLetter: 'x' },
      { name: 'x4', freq: 0, keyLetter: 'x' },
      { name: 'x5', freq: 0, keyLetter: 'x' },
      { name: 'x6', freq: 0, keyLetter: 'x' },
      { name: 'x7', freq: 0, keyLetter: 'x' },
      { name: 'x8', freq: 0, keyLetter: 'x' },
      { name: 'x9', freq: 0, keyLetter: 'x' },
      { name: 'x10', freq: 0, keyLetter: 'x' },
      { name: 'x11', freq: 0, keyLetter: 'x' },
      { name: 'x12', freq: 0, keyLetter: 'x' },
      { name: 'x13', freq: 0, keyLetter: 'x' },
    
    ]

    this.state = {
      sideDrawerOpen: false,
      filterFrequency: 375,
      filterGain: 100,
      attackTime: 0.2,
      decayTime: 0.5,
      sustainLevel: 0.5,
      releaseTime: 0.3,
      delayTime: 0.5,

      setFilterFrequency: (f) => {},

      setFilterGain: (g) => {},

      setAttackTime: (t) => {},

      setDecayTime: (t) => {},

      setSustainLevel: (l) => {},

      setReleaseTime: (t) => {}
    }

    this.waveform = 'sawtooth'
    this.frequency = 220
    this.filterFrequency = 375
    this.filterGain = 100
    this.attackTime = 0.2
    this.decayTime = 0.5
    this.sustainLevel = 0.5
    this.releaseTime = 0.3
    this.delayTime = 0.5
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
    if (!this.audioContext) {
      this.createContexts()
    }

    //MASTER GAINN NODE
    this.masterGainNode = this.audioContext.createGain()
    this.masterGainNode.gain.value = 0
    //MASTER GAINN NODE

    //OSCILLATOR
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.type = this.waveform || 'sine'
    this.oscillator.frequency.value = this.frequency || 440
    //OSCILLATOR

    //FILTER
    this.filter = this.audioContext.createBiquadFilter()
    this.filter.type = this.state.filterType || 'lowpass'
    this.filter.frequency.setValueAtTime(this.filterFrequency, this.audioContext.currentTime)
    this.filter.gain.setValueAtTime(this.filterGain, this.audioContext.currentTime)
    //FILTER

    //ASDR
    this.adsr = new EnvGen(this.audioContext, this.masterGainNode.gain)
    this.adsr.mode = 'ADSR'
    this.adsr.attackTime = this.attackTime
    this.adsr.decayTime = this.decayTime
    this.adsr.sustainLevel = this.sustainLevel
    this.adsr.releaseTime = this.releaseTime
    //ASDR

    // Connect the nodes

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
    this.grapherNode = createGrapher(this.audioContext, document.querySelector('#env-graph'), 1024)
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
    if (!this.playing.length > 0) {
      this.playing.push('Yup')
      this.setFrequency(freq)
      this.adsr.gateOn(this.audioContext.currentTime)
    }
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
    this.playing.pop()
    this.adsr.gateOff(this.audioContext.currentTime)
  }

  render () {
    return (
      
      <div className="synth__all" id="keyboardDiv" onKeyDown={this.keyPlaySound2} onKeyUp={this.stopSound}>
        <ValuesContext.Consumer>
          {(context) => {
            console.log(this)
            this.waveform = context.waveform
            this.filterFrequency = context.filterFrequency
            this.filterGain = context.filterGain
            this.attackTime = context.attackTime
            this.decayTime = context.decayTime
            this.sustainLevel = context.sustainLevel
            this.releaseTime = context.releaseTime
            this.delayTime = context.delayTime
          }}
        </ValuesContext.Consumer>
       



        <Frequency value={this.state.frequency} updateFrequency={this.setFrequency} />

        <div id="keyboard">
          <canvas id="env-graph"  />
          <div />
         
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

            <div className='empty'><h5>Waveform</h5></div>
            <button className='UP'><h5>UP</h5></button>
            <button className='DN'><h5>DN</h5></button>
            <div className="controlWave">       
          <select id="waveform" value={this.state.waveform} onChange={this.setWaveform}>
            <option value={WAVEFORMS.SINE.id}>{WAVEFORMS.SINE.userTerm}</option>
            <option value={WAVEFORMS.SAWTOOTH.id}>{WAVEFORMS.SAWTOOTH.userTerm}</option>
            <option value={WAVEFORMS.TRIANGLE.id}>{WAVEFORMS.TRIANGLE.userTerm}</option>
            <option value={WAVEFORMS.SQUARE.id}>{WAVEFORMS.SQUARE.userTerm}</option>
          </select>
        </div>
          </div>
          <div className='mesa' ><Table /> </div>
        </div>
      </div>
      
    )
  }
}
