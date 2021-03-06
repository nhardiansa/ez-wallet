import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import EZButton from './EZButton';
import style from '../styles/scss/Navbar.module.scss';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {showModal as showModalAction} from '../redux/actions/transactionAction'

import picturePlaceholder from '../public/images/testi-placeholder.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { parsePhoneNumber } from 'libphonenumber-js';

export default function EZNavbar ({bgWhite}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const {userReducer} = useSelector(state => state);
  const {userProfile, userPhoneList} = userReducer;

  const [isHomepage, setIsHomepage] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    showShadow();
    window.addEventListener('scroll', showShadow);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(userPhoneList.length, 'userPhoneList');

    if (token) {
      setIsLogged(true);
    }

    if (router.pathname === '/') {
      setIsHomepage(true);
    }

    console.log(router.pathname);
  }, [router]);

  const showShadow = () => {
    const position = Math.floor(window.scrollY);

    if (position >= 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const logOutHandler = () => {
    const confirm = window.confirm('Are you sure you want to log out?');

    if (!confirm) {
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
    router.push('/login');
    setIsLogged(false);
  }

  return (
    <Navbar className={`${(isScrolled || !isHomepage) ? 'shadow rounded-bottom' : ''} ${style.navbar}`} fixed='top' collapseOnSelect expand="lg" bg={bgWhite ? 'white':'primary' } variant={bgWhite ? 'light':'dark' }>
      <Container className='py-lg-1'>
      <Navbar.Brand href="#home" className={`${bgWhite ? 'text-primary' : 'text-white'} fw-bolder fs-3`}>EZ Wallet</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className='border-0 text-primary'/>
      <Navbar.Collapse id="responsive-navbar-nav align-items-center" >
        {
          isLogged
            ? (
            <Nav className='ms-auto align-items-center pt-4 pt-lg-0'>
              <Image src={userProfile.picture || picturePlaceholder} onClick={() => router.push('/profile')} alt='user-picture' className='rounded' layout='fixed' width={52} height={52} />
              <div className={`${bgWhite ? 'text-primary' : 'text-white'} contact mx-4 d-none d-lg-block`}>
                <p className="name m-0 mb-2 fw-bold text-capitalize">{userProfile.fullName || 'Unknown'}</p>
                <p className="phone m-0">
                  {
                    Number(userPhoneList.length) > 0 ? parsePhoneNumber(userPhoneList[0].number, 'ID').formatInternational() : 'Phone number not set'
                  }
                </p>
              </div>
              <IoMdNotificationsOutline className={`${bgWhite ? 'text-primary' : 'text-white'} fs-2 my-4`} />
              <div className="d-lg-none d-flex flex-column align-items-center">
                <Link href="/dashboard">
                  <a className='mb-3'>Dashboard</a>
                </Link>
                <Link href="/transfer">
                  <a className='mb-3'>Transfer</a>
                </Link>
                {/* <Link href="/dashboard"> */}
                  <p onClick={() => dispatch(showModalAction(true))} className='mb-3 text-primary'>Top Up</p>
                {/* </Link> */}
              </div>
              <EZButton onClick={logOutHandler} variant='white' className='d-lg-none mb-4 w-100'>Log out</EZButton>
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
