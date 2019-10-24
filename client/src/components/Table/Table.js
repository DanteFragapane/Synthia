import React from 'react'

import './Table.css'

import { ValuesContext } from '../Pages/Main/ValuesContext'
import SynthApp from '../Synth'

// slider
import Knob from '../Knob'

export default class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = { selected: '' }
    this.num = [ 'square', 'sine', 'triangle', 'sawtooth' ]
  }

  render () {
    return (
      <div className='yeahdiv'>
        <div className='divider'>
          <div className='filterF'>
            <div className='textlabel'>FILTER FREQ</div>
            <div>
              <ValuesContext.Consumer>
                {(state) => {
                  return (
                    <Knob
                      min={0}
                      max={1000}
                      step={1}
                      defaultValue={500}
                      onChange={function (e) {
                        state.setFilterFrequency(e.target.value)
                      }}
                    />
                  )
                }}
              </ValuesContext.Consumer>
            </div>
          </div>
        </div>

        <div className='divider'>
          <div className='filterG'>
            <div className='textlabel'>FILTER GAIN</div>
            <ValuesContext.Consumer>
              {(state) => {
                return (
                  <Knob
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={100}
                    onChange={(e) => {
                      state.setFilterGain({ value: e.target.value })
                    }}
                  />
                )
              }}
            </ValuesContext.Consumer>
          </div>
        </div>

        <div className='divider'>
          <div className='attack'>
            <div className='textlabel'>ATTACK</div>
            <ValuesContext.Consumer>
              {(state) => {
                return (
                  <Knob
                    min={0}
                    max={10}
                    step={0.1}
                    defaultValue={0.1}
                    onChange={(e) => {
                      state.setAttackTime({ value: e.target.value })
                    }}
                  />
                )
              }}
            </ValuesContext.Consumer>
          </div>
        </div>

        <div className='divider'>
          <div className='decay'>
            <div className='textlabel'>DECAY</div>
            <ValuesContext.Consumer>
              {(state) => {
                return (
                  <Knob
                    min={0}
                    max={10}
                    step={0.1}
                    defaultValue={0.1}
                    onChange={(e) => {
                      state.setDecayTime({ value: e.target.value })
                    }}
                  />
                )
              }}
            </ValuesContext.Consumer>
          </div>
        </div>

        <div className='divider'>
          <div className='sustain'>
            <div className='textlabel'>SUSTAIN</div>
            <ValuesContext.Consumer>
              {(state) => {
                return (
                  <Knob
                    min={0}
                    max={1}
                    step={0.1}
                    defaultValue={0.5}
                    onChange={(e) => {
                      state.setSustainLevel({ value: e.target.value })
                    }}
                  />
                )
              }}
            </ValuesContext.Consumer>
          </div>
        </div>

        <div className='divider'>
          <div className='release'>
            <div className='textlabel'>RELEASE</div>
            <ValuesContext.Consumer>
              {(state) => {
                return (
                  <Knob
                    min={0}
                    max={10}
                    step={0.1}
                    defaultValue={0.1}
                    onChange={(e) => {
                      state.setReleaseTime({ value: e.target.value })
                    }}
                  />
                )
              }}
            </ValuesContext.Consumer>
          </div>

        </div>
        
      </div>

    )
  }
}
