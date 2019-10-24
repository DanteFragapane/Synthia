import React from 'react'
import './SideDrawer.css'

const sideDrawer = props => {
  let drawerClasses = ['side-drawer']
  if (props.show) {
    drawerClasses = ['side-drawer open']
  }
  return (
    <nav className={drawerClasses}>
      <h2>Synthia</h2>
      <h3 className='casttitle'>-Cast-</h3>
      <ul>
        <h5 className='cast'>Backend-wiz</h5>
        <li><a href='https://github.com/DanteFragapane'>Dante Fragapane</a></li>
        <h5 className='cast'>Sound-Experience</h5>
        <li><a href='https://github.com/ajbarbati'>Alexander Barbati</a></li>
        <h5 className='cast'>Pretty-colors</h5>
        <li><a href='https://github.com/oinksu'>Felipe Amunategui</a></li>
      </ul>

    </nav>)
}

export default sideDrawer
