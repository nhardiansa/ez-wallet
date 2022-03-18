import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import EZButton from './EZButton';
import style from '../styles/scss/Navbar.module.scss';
import { IoMdNotificationsOutline } from 'react-icons/io';

import picturePlaceholder from '../public/images/testi-placeholder.jpg';

export default function EZNavbar () {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    showShadow();
    window.addEventListener('scroll', showShadow);
  }, []);

  const showShadow = () => {
    const position = Math.floor(window.scrollY);

    if (position >= 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  return (
    <Navbar className={`${isScrolled ? 'shadow rounded-bottom' : ''} ${style.navbar}`} fixed='top' collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container className='py-lg-3'>
      <Navbar.Brand href="#home" className='fw-bold fs-3'>EZ Wallet</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className='border-0'/>
      <Navbar.Collapse id="responsive-navbar-nav align-items-center" >
        {
          isLogged
            ? (
            <Nav className='ms-auto align-items-center pt-4 pt-lg-0'>
              <Image src={picturePlaceholder} alt='user-picture' className='rounded' layout='fixed' width={52} height={52} />
              <div className="contact text-white mx-4 d-none d-lg-block">
                <p className="name m-0 mb-2 fw-bold">Robert Chandler</p>
                <p className="phone m-0">+62 8139 3877 7946</p>
              </div>
              <IoMdNotificationsOutline className='fs-2 text-white my-4' />
              <EZButton variant='white' className='d-lg-none mb-4 w-100'>Log out</EZButton>
            </Nav>
              )
            : (
            <Nav className="ms-auto text-white my-4 my-lg-0">
              <EZButton onClick={() => router.push('/login')} variant='white-outline'>Login</EZButton>
              <EZButton onClick={() => router.push('/register')} variant='white' className='mt-3 mt-lg-0 ms-lg-4'>Sign Up</EZButton>
            </Nav>
              )
        }
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
