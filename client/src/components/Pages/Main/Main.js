import React from 'react'
import './Main.css'

import Header from '../../Header'
import Footer from '../../Footer'
import Synth from '../../Synth'
import Sidebar from '../../Sidebar'

function Main () {
  return (

    <div className='grid-container'>
      <Header className='item1' />
      <Sidebar className='item2' />
      <Synth className='item3' />
      <Footer className='item4' />
    </div>

  )
}

export default Main
