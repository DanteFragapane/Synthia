
import React from 'react'
import './Main.css'
import Header from '../../Header'
import Footer from '../../Footer'
import SynthApp from '../../Synth/index'
import Sidebar from '../../Sidebar'
import Table from '../../Table'
import '../../HorizontalBar'
import HorizontalBar from '../../HorizontalBar'

function Main () {
  return (
    <div className='wrapper'>
      <div className='one'><Header /></div>
      <div className='two'><Sidebar /></div>
      <div className='three'><SynthApp /></div>
      <div className='four'><Table /></div>
      <div className='five'><Table /></div>
      <div className='six'><Table /></div>
      <div className='seven'><HorizontalBar /></div>
      <div className='eight'><Footer /></div>
    </div>
  )
}
export default Main
