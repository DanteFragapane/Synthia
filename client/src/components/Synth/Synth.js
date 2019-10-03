import React from 'react'
import './Synth.css'

function Synth () {
  // this creates the audio context
  const context = new (window.AudioContext || window.webkitAudioContext)()

  // creates the repeating ocillator
  // OscillatorNode.type = 'sine' | 'square' | 'triangle' | 'sawtooth'

  const oscillator = context.createOscillator()

  oscillator.type = 'square, triangle, sawtooth'
  oscillator.frequency.value = 111
  oscillator.connect(context.destination)
  oscillator.start()

  return (
    <div className='synth'>farts</div>
  )
}

export default Synth
