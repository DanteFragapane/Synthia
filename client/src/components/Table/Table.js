import React from 'react'
import { Table } from 'reactstrap'
import './Table.css'
import { Button } from 'reactstrap'

// slider
import Knob from '../Knob'

export default class Example extends React.Component {
  render () {
    return (

      <Table>

        <div className='yeahdiv'>

          <div className='divider'><div className='buttononetopleft'><div className='textlabel'>FREQUENCY</div>
            <div><Knob />{' '}</div>
          </div>
          </div>

          <div className='divider'><div className='buttontwotopmid'><div className='textlabel'>DURATION</div>
            <div><Knob />{' '}</div>
          </div>
          </div>

          <div className='divider'><div className='buttonthreetopmid'><div className='textlabel'>FILTER FREQUENCY</div>
            <div><Knob />{' '}</div>
          </div>
          </div>

          <div className='divider'><div className='buttonfourtopright'><div className='textlabel'>FILTER GAIN</div>
            <div><Knob />{' '}</div>
          </div>
          </div>

          <div className='divider'><div className='buttonfirstbottomleft' ><div className='textlabel'>ATTACK</div>
            <div><Knob />{' '}</div>
          </div>
          </div>

          <div className='divider'><div className='buttonsecondbottommid'><div className='textlabel'>DECAY</div>
            <div><Knob />{' '}</div>
          </div>
          </div>

          <div className='divider'><div className='buttonthirdbottommid'><div className='textlabel'>SUSTAIN</div>
            <div><Knob />{' '}</div>
          </div>
          </div>

          <div className='divider'><div className='buttonfourthbottomright'><div className='textlabel'>RELEASE</div>
            <div><Knob />{' '}</div>
          </div>
          </div>

        </div>
      </Table>
    )
  }
}
