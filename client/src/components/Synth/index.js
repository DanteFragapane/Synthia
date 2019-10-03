import React from 'react'
import { render } from 'react-dom'
import makeSound from './Oscillator'
import Synthesizer from './Synth'

const SynthApp = () => (
    <div>
        <Synthesizer makeSound={makeSound} />
    </div>
)

render(<SynthApp makeSound={makeSound} />, document.getElementById("root"))
