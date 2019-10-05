import React from 'react'
import './Sidebar.css'
import '../Table'

function Sidebar () {
  return (
    <div>
      <div id='mySidebar' class='sidebar'>
        <a href='javascript:void(0)' class='closebtn' onclick='closeNav()'>&times;</a>
        <a href='#'>About</a>
        <a href='#'>Services</a>
        <a href='#'>Clients</a>
        <a href='#'>Contact</a>
      </div>

      <div id='main'>
        <button class='openbtn' onclick='openNav()'>&#9776; Toggle Sidebar</button>
        <h2>Collapsed Sidebar</h2>
        <p>Content...</p>
      </div>
    </div>

  )
}
export default Sidebar
