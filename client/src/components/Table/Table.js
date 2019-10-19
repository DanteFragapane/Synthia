import React from 'react'
import { Table } from 'reactstrap'
import './Table.css'
import { Button } from 'reactstrap'
import { ValuesContext } from '../Pages/Main/ValuesContext'

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
      <Table>
        <div className="yeahdiv">
          <div className="divider">
            <div className="buttonthreetopmid">
              <div className="textlabel">FILTER FREQ</div>
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

          <div className="divider">
            <div className="buttonfourtopright">
              <div className="textlabel">FILTER GAIN</div>
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

          <div className="divider">
            <div className="buttonfirstbottomleft">
              <div className="textlabel">ATTACK</div>
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

          <div className="divider">
            <div className="buttonsecondbottommid">
              <div className="textlabel">DECAY</div>
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

          <div className="divider">
            <div className="buttonthirdbottommid">
              <div className="textlabel">SUSTAIN</div>
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

          <div className="divider">
            <div className="buttonfourthbottomright">
              <div className="textlabel">RELEASE</div>
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

          <div className="divider">
            <div className="buttonfourthbottomright">
              <div className="textlabel">WAVEFORM</div>
              <ValuesContext.Consumer>
                {(context) => {
                  return (
                    <select
                      name="select"
                      value={this.state.selected}
                      onChange={(e) => {
                        this.setState({ waveform: e.target.value })
                        context.setWaveform(e.target.value)
                      }}
                    >
                      {this.num.map((n) => {
                        return <option value={n}>{n}</option>
                      })}
                    </select>
                  )
                }}
              </ValuesContext.Consumer>
            </div>
          </div>
        </div>
      </Table>
    )
  }
}
