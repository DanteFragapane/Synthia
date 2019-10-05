import React from 'react'
import './Main.css'

import Header from '../../Header'
import Footer from '../../Footer'
import SynthApp from '../../Synth/index'
import Sidebar from '../../Sidebar'
import Table from '../../Table'

function Main () {
  return (
    <div className="grid-container">
      <Header className="header" />
      <Sidebar className="sidebar" />
      <SynthApp className="synth" />
      <Table className="table" />
      <Footer className="footer" />
    </div>
  )
}

export default Main
