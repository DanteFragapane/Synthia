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

      setFilterFrequency: (e) => {
        if (e > 0 && e < 1000) {
          this.setState({ filterFrequency: Number(e) })
        } else this.setState({ filterFrequency: 500 })
      },

      setFilterGain: (e) => {
        this.setState({ filterGain: Number(e) })
      },

      setAttackTime: (a) => {
        if (a > 0 && a < 10) {
          this.setState({ attackTime: Number(a) })
        } else this.setState({ attackTime: 0.5 })
      },

      setDecayTime: (d) => {
        if (d > 0 && d < 10) {
          this.setState({ decayTime: Number(d) })
        } else this.setState({ decayTime: 1 })
      },

      setSustainLevel: (s) => {
        if (s > 0 && s < 1) {
          this.setState({ sustainLevel: Number(s) })
        } else this.setState({ sustainLevel: 0.5 })
      },

      setReleaseTime: (r) => {
        if (r > 0 && r > 10) {
          this.setState({ releaseTime: Number(r) })
        } else this.setState({ releaseTime: 1 })
      }
    }
  }

  componentDidUpdate () {
    console.log(this.state)
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
