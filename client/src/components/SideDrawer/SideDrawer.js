import React from 'react'
import './SideDrawer.css'

const sideDrawer = props => {
  let drawerClasses = ['side-drawer']
  if (props.show) {
    drawerClasses = ['side-drawer open']
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li><a href='/'>Patch # 1 </a></li>
        <li><a href='/'>Patch # 2 </a></li>
        <li><a href='/'>Patch # 3 </a></li>
        <li><a href='/'>Patch # 4 </a></li>
        <li><a href='/'>Patch # 5 </a></li>
        <li><a href='/'>Patch # 6 </a></li>
        <li><a href='/'>Patch # 7 </a></li>
        <li><a href='/'>Patch # 8 </a></li>
        <li><a href='/'>Patch # 9 </a></li>
        <li><a href='/'>Patch # 10 </a></li>
        <li><a href='/'>Patch # 11 </a></li>
      </ul>
    </nav>)
}

export default sideDrawer
