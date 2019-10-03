import React from 'react'
import './Sidebar.css'
import '../Table'

function Sidebar () {
  return (

    <div>

      <div className='sidebar'>
        <a className='active' href='#home'>Home</a>
        <a href='#Thing1'>Thing 1</a>
        <a href='#Thing2'>Thing 2</a>
        <a href='#Thing3'>Thing 3</a>
        <a href='#Thing4'>Thing 4</a>
        <a href='#Thing5'>Thing 5</a>
        <a href='#Thing6'>Thing 6</a>
        <a href='#Thing7'>Thing 7</a>
        <a href='#Thing8'>Thing 8</a>
        <a href='#Thing9'>Thing 9</a>
        <a href='#Thing10'>Thing 10</a>
        <div className='content'>        </div>

      </div>

    </div>

  )
}
export default Sidebar
