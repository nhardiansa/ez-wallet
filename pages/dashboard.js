import EZButton from '../components/EZButton';
import EZLayout from '../components/EZLayout';
import {BsArrowUp, BsPlus} from 'react-icons/bs';
import {BiUser} from 'react-icons/bi';
import {MdOutlineSpaceDashboard, MdOutlineLogout} from 'react-icons/md';
import Head from 'next/head';
import Link from 'next/link';
import AuthWrapper from '../components/AuthWrapper';

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <EZLayout useHeaderFooter={true} bgWhite={true}>
        <div className="row justify-content-center">
          <div className="col-lg-3 d-none d-lg-block">
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
          </div>
          <div className="col row justify-content-center">
            <div className="col-12 w-100 mb-3 balance-info row bg-primary shadow rounded px-1 py-3 text-white">
              {/* <div className=""> */}
                <div className="col-12 col-md-6">
                  <p className='fs-5'>Balance</p>
                  <p className='fs-1 fw-bolder'>Rp.120.000</p>
                  <p>+62 813-9387-7946</p>
                </div>
                <div className="col d-flex flex-column justify-content-start align-items-md-end">
                  <EZButton variant='white' className='mb-2'>
                    <BsArrowUp /> Transfer
                  </EZButton>
                  <EZButton variant='white' >
                    <BsPlus className='fs-4' /> Top Up
                  </EZButton>
                </div>
              {/* </div> */}
            </div>
            <div className="col-12 row gx-3 px-0">
              <div className="col-12 col-md-8 mb-3 mb-md-0 ps-0 pe-0 pe-md-2">
                <div className="chart-wrapper shadow rounded">
                  <h1>Chart</h1>
                </div>
              </div>
              <div className="col-12 col-md-4 pe-0 ps-0 ps-md-2">
                <div className="wrapper shadow rounded">
                  transaction history
                </div>
              </div>
            </div>
          </div>
        </div>
      </EZLayout>
    </>
  )
}

export default Dashboard;
