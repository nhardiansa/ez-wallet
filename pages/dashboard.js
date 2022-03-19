import EZButton from '../components/EZButton';
import EZLayout from '../components/EZLayout';
import {BsArrowUp, BsPlus} from 'react-icons/bs';
import Head from 'next/head';
import EZAsideNavigation from '../components/EZAsideNavigation';

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <EZLayout useHeaderFooter={true} bgWhite={true}>
        <div className="row justify-content-center">
          <div className="col-lg-3 d-none d-lg-block">
            <EZAsideNavigation />
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
