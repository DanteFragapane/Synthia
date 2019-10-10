import React from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import './HorizontalBar.css'
import Keyboard from 'C:/Users/xpat1/Desktop/project3/KnightsOfDweebdom/client/src/Keyboard.png'

export default class HorizontalBar extends React.Component {
  constructor (props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render () {
    return (
      <div>
        <Navbar color='dark' dark>
          <NavbarBrand href='/' className='mr-auto'>Synthdweeb</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className='mr-2' />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem className='navitem'>
                <img src={Keyboard} alt='' />

              </NavItem>
              <NavItem>
                <NavLink href='https://github.com/DanteFragapane/KnightsOfDweebdom'>GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
