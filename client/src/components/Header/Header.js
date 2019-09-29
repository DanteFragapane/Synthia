import React from 'react'
import './Header.css'

const Header = props => (

  <div className='header'> This is a header
    <div className='title'>{props.children}</div>
  </div>
)

export default Header
