import React from 'react'
import './Main.css'

import Header from '../../Header'
import Footer from '../../Footer'
import Synth from '../../Synth'
import Sidebar from '../../Sidebar'

function Main () {
  return (

    <div>
      <Header />
      <Sidebar />
      <Synth />
      <Footer />
    </div>

  )
}

export default Main
