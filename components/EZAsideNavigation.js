import {BiUser} from 'react-icons/bi';
import {MdOutlineSpaceDashboard, MdOutlineLogout} from 'react-icons/md';
import {BsArrowUp, BsPlus} from 'react-icons/bs';
import Link from 'next/link'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../redux/actions/transactionAction';

export default function EZAsideNavigation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pathName, setPathName] = useState('');

  useEffect(() => {
    const parentPath = router.pathname.split('/')[1];
    if (parentPath) {
      setPathName(parentPath);
    }
  }, [router.pathname])

  return (
    <div className="navigation-wrapper d-flex flex-column justify-content-between h-100 rounded shadow py-3 px-4">
      <div className="menu d-flex flex-column justify-content-between">
        <Link href="/dashboard">
          <a className={`${(pathName === 'dashboard') ? 'fw-bolder' : ''} fs-5 align-middle my-4`}>
            <MdOutlineSpaceDashboard className='fs-3 me-3' />  Dashboard
          </a>
        </Link>
        <Link href="/transfer">
          <a className={`${(pathName === 'transfer') ? 'fw-bolder' : ''} fs-5 align-middle my-4`}>
            <BsArrowUp className='fs-3 me-3' />  Transfer
          </a>
        </Link>
        {/* <Link href="/dashboard"> */}
          <p
            style={{cursor: 'pointer'}}
            onClick={() => dispatch(showModal(true))}
            className={`${(pathName === 'topup') ? 'fw-bolder' : ''} text-primary fs-5 align-middle my-4`}
          >
            <BsPlus className='fs-2 me-3' />  Top Up
          </p>
        {/* </Link> */}
        <Link href="/profile">
          <a className={`${(pathName === 'profile') ? 'fw-bolder' : ''} fs-5 align-middle my-4`}>
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
