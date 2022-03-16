import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import EZButton from './EZButton'

export default function EZNavbar() {
  return (
    <Navbar fixed='top' collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container className='py-lg-3'>
      <Navbar.Brand href="#home" className='fw-bold fs-3'>EZ Wallet</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className='border-0'/>
      <Navbar.Collapse id="responsive-navbar-nav align-items-center" >
        <Nav className="ms-auto text-white my-4 my-lg-0 ">
          <EZButton variant='white-outline'>Login</EZButton>
          <EZButton variant='white' className='mt-3 mt-lg-0 ms-lg-4'>Sign Up</EZButton>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
