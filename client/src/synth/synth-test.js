import React from "react"


function Synth () {
    // this creates the audio context
const context = new (window.AudioContext || window.webkitAudioContext) ()

// creates the repeating ocillator 
// OscillatorNode.type = 'sine' | 'square' | 'triangle' | 'sawtooth'

const oscillator = context.createOscillator()

oscillator.type = 'sine'
oscillator.frequency.value = 200
oscillator.connect(context.destination)
oscillator.start() 

    return (
        <div>farts</div>
    )

}

export default Synth
