import {BiUser} from 'react-icons/bi';
import {MdOutlineSpaceDashboard, MdOutlineLogout} from 'react-icons/md';
import {BsArrowUp, BsPlus} from 'react-icons/bs';
import Link from 'next/link'

export default function EZAsideNavigation() {
  return (
    <div className="navigation-wrapper d-flex flex-column justify-content-between h-100 rounded shadow py-3 px-4">
      <div className="menu d-flex flex-column justify-content-between">
        <Link href="/dashboard">
          <a className='fs-5 align-middle my-4'>
            <MdOutlineSpaceDashboard className='fs-3 me-3' />  Dashboard
          </a>
        </Link>
        <Link href="/dashboard">
          <a className='fs-5 align-middle my-4'>
            <BsArrowUp className='fs-3 me-3' />  Transfer
          </a>
        </Link>
        <Link href="/dashboard">
          <a className='fs-5 align-middle my-4'>
            <BsPlus className='fs-2 me-3' />  Top Up
          </a>
        </Link>
        <Link href="/dashboard">
          <a className='fs-5 align-middle my-4'>
            <BiUser className='fs-3 me-3' />  Profile
          </a>
        </Link>
      </div>
      <Link href="/logout">
          <a className='fs-5 align-middle mb-4'>
            <MdOutlineLogout className='fs-3 me-3' />  Log Out
          </a>
        </Link>
    </div>
  )
}
