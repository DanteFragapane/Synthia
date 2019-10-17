
import React from 'react'
import './Main.css'
import Header from '../../Header'
import Footer from '../../Footer'
import Table from '../../Table'
import HorizontalBar from '../../HorizontalBar'
import Toolbar from '../../Toolbar'
import SideDrawer from '../../SideDrawer/SideDrawer'
import Backdrop from '../../Backdrop/Backdrop'
import Knob from '../../Knob'
// import Mockvisualizer from '../../Mockvisualizer'





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
    
    <div className='three'><div className ='visualframe'><h1>Vizualize!</h1>
      
      </div></div>
    <div className='four'><Table /></div>

   
    <div className='six'><HorizontalBar /></div>
    <div className='seven'><Footer /></div>
  </div>
)

}

}


export default Main
