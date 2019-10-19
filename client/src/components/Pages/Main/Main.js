import React from 'react'
import './Main.css'
import Header from '../../Header'
import Footer from '../../Footer'
import Table from '../../Table'
import HorizontalBar from '../../HorizontalBar'
import Toolbar from '../../Toolbar'
import SideDrawer from '../../SideDrawer/SideDrawer'
import Backdrop from '../../Backdrop/Backdrop'
import { ValuesContext } from './ValuesContext'

class Main extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      sideDrawerOpen: false,
      filterFrequency: 375,
      filterGain: 50,
      attackTime: 0.2,
      decayTime: 0.5,
      sustainLevel: 0.5,
      releaseTime: 0.3,
      delayTime: 0.5,

      setFilterFrequency: (f) => {
        this.setState({ filterFrequency: Number(f) })
      },

      setFilterGain: (g) => {
        this.setState({ filterGain: Number(g) })
      },

      setAttackTime: (t) => {
        this.setState({ attackTime: Number(t) })
      },

      setDecayTime: (t) => {
        this.setState({ decayTime: Number(t) })
      },

      setSustainLevel: (l) => {
        this.setState({ sustainLevel: Number(l) })
      },

      setReleaseTime: (t) => {
        this.setState({ releaseTime: Number(t) })
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
        <div className="one">
          <Header />
        </div>
        <div className="two">
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        </div>
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}

        <div className="three">
          <div className="visualframe">
            <h1>Vizualize!</h1>
            <canvas id="env-graph" width="600" height="300"></canvas>
          </div>
        </div>
        <div className="four">
          <ValuesContext.Provider value={this.state}>
            <Table />
          </ValuesContext.Provider>
        </div>

        <div className="six">
          <ValuesContext.Provider value={this.state}>
            <HorizontalBar />
          </ValuesContext.Provider>
        </div>
        <div className="seven">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Main
