
import React from 'react'
import './Main.css'
import Header from '../../Header'
import Footer from '../../Footer'
import SynthApp from '../../Synth/index'
import Sidebar from '../../Sidebar'
import Table from '../../Table'
import HorizontalBar from '../../HorizontalBar'
import Toolbar from '../../Toolbar'
import SideDrawer from '../../SideDrawer/SideDrawer'
import Backdrop from '../../Backdrop/Backdrop'



class Main extends React.Component {

  state = {
    sideDrawerOpen: false
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => { 
     return {sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  }

render() {

let sideDrawer = null
let backdrop = null

if (this.state.sideDrawerOpen) {

  backdrop = <Backdrop click={this.backdropClickHandler} />
}

return (
  <div style={{ height: '100%' }} className='wrapper'>
    <div className='one'><Header /></div>
    <div className='two'><Toolbar drawerClickHandler={this.drawerToggleClickHandler} /></div>
    <SideDrawer show={this.state.sideDrawerOpen}/>
    {backdrop}
    <div className='five'><SynthApp /></div>
    <div className='six'><Table /></div>
    <div className='seven'><Table /></div>
    <div className='nine'><HorizontalBar /></div>
    <div className='ten'><Footer /></div>
  </div>
)

}

}


export default Main
