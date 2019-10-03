import React from 'react'
import './Main.css'

import Header from '../../Header'
import Footer from '../../Footer'
import Synth from '../../Synth'
import Sidebar from '../../Sidebar'
import Table from '../../Table'

function Main () {
  return (

    <div className='grid-container'>
      <Header className='item1' />
      <Sidebar className='item2' />
      <Synth className='item3' />
      <Table className='item4' />
      <Footer className='item5' />
    </div>

  )
}

export default Main