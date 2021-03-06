import React from 'react'
import './Main.css'

import Footer from '../../Footer'
import Keyboardcommand from '../../Keyboardcommand'
import Toolbar from '../../Toolbar'
import SideDrawer from '../../SideDrawer/SideDrawer'
import Backdrop from '../../Backdrop/Backdrop'
import { ValuesContext } from './ValuesContext'



class Main extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      sideDrawerOpen: false,
      waveform: 'square',
      filterFrequency: 375,
      filterGain: 50,
      attackTime: 0.2,
      decayTime: 0.5,
      sustainLevel: 0.5,
      releaseTime: 0.3,
      delayTime: 0.5,

      setWaveform: (w) => {
        this.setState({ waveform: w })
      },

      setFilterFrequency: (f) => {
        this.setState({ filterFrequency: Number(f) })
      },

      setFilterGain: (g) => {
        this.setState({ filterGain: Number(g.value) })
      },

      setAttackTime: (t) => {
        this.setState({ attackTime: Number(t.value) })
      },

      setDecayTime: (t) => {
        this.setState({ decayTime: Number(t.value) })
      },

      setSustainLevel: (l) => {
        this.setState({ sustainLevel: Number(l.value) })
      },

      setReleaseTime: (t) => {
        this.setState({ releaseTime: Number(t.value) })
      }
    }
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false })
  }

  render () {
    let sideDrawer = null
    let backdrop = null

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <div style={{ height: '100%' }} className="wrapper">
  
        <div className="headers">
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        </div>
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}


        <div className="four">
          <ValuesContext.Provider value={this.state}>
      
          </ValuesContext.Provider>
        </div>

        <div className="keyboardCommand">
          <ValuesContext.Provider value={this.state}>
            <Keyboardcommand />
          </ValuesContext.Provider>
        </div>
        <div className="footers">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Main
