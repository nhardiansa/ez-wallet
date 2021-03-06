import Head from 'next/head';
import Link from 'next/link';
import EZButton from '../../components/EZButton';
import EZLayout from '../../components/EZLayout';
import {BsArrowUp, BsPlus} from 'react-icons/bs';
import EZAsideNavigation from '../../components/EZAsideNavigation';
import EZHistoryItem from '../../components/EZHistoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../redux/actions/transactionAction';
import { getHistories } from '../../redux/actions/historyAction';
import { useEffect, useState } from 'react';
import EZChart from '../../components/EZChart';

function Dashboard() {
  const dispatch = useDispatch();
  const { historyReducer, userReducer } = useSelector(state => state);
  const {histories, loading, error} = historyReducer
  const { currentBalance, userList } = userReducer

  const [populatedHistory, setPopulatedHistory] = useState([]);

  useEffect(() => {
    // if (histories.length === 0) {
      dispatch(getHistories());
    // }
  }, [])

  useEffect(() => {
    if ((histories.length > 0) && (userList.length > 0)) {
      const populatedHistory = histories.map(history => {
        let user = userList.find(user => user.id === history.anotherUserId);
        
        // find current user
        if (!user) {
          user = userList.find(user => user.id === history.userId);
        }
        
        return {
          ...history,
          user
        }
      })
      setPopulatedHistory(populatedHistory);
    }
  }, [histories, userList])

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <EZLayout useHeaderFooter={true} bgWhite={true}>
        <div className="row justify-content-center h-100">
          <div className="col-lg-3 d-none d-lg-block">
            <EZAsideNavigation />
          </div>
          <div className="col d-flex flex-column align-items-center h-100">
            <div className="col-12 w-100 mb-3 balance-info row bg-primary shadow rounded px-1 py-3 text-white">
              {/* <div className=""> */}
                <div className="col-12 col-md-6">
                  <p className='fs-5'>Balance</p>
                  <p className='fs-1 fw-bolder'>Rp{Number(currentBalance).toLocaleString('id-ID') || 0}</p>
                  <p>+62 813-9387-7946</p>
                </div>
                <div className="col d-flex flex-column justify-content-start align-items-md-end">
                  <EZButton variant='white' className='mb-2'>
                    <BsArrowUp /> Transfer
                  </EZButton>
                  <EZButton onClick={() => dispatch(showModal(true))} variant='white' >
                    <BsPlus className='fs-4' /> Top Up
                  </EZButton>
                </div>
              {/* </div> */}
            </div>
            <div className="col-12 row gx-3 px-0 h-100">
              <div className="col-12 col-lg-7 mb-3 mb-lg-0 ps-0 pe-0 pe-lg-2">
                <div className="chart-wrapper p-3 shadow rounded">
                  {/* <h1>Chart</h1> */}
                  <EZChart
                    labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                    data={[300, 50, 100, 40, 120, 80, 10]}
                    expense={0}
                    income={0}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-5 pe-0 ps-0 ps-lg-2">
                <div className="wrapper shadow rounded p-3">
                  <div className="heading d-flex justify-content-between">
                    <h2 className='fs-5 fw-bold text-black'>Transaction History</h2>
                    <Link href="/dashboard/history">
                      <a className='fw-semi-bold'>See all</a>
                    </Link>
                  </div>
                  <div className="history-list mt-3">
                    {
                      loading && (
                        <div className="text-center">
                          <div className="spinner-border text-primary" role="status"></div>
                        </div>
                      )
                    }
                    {
                      error && (
                        <div className="text-center">
                          <p className='text-danger fs-2'>{error}</p>
                        </div>
                      )
                    }
                    {
                      (histories.length && userList.length && !loading && !error) ? (
                        [...populatedHistory].slice(0, 4).map((item, index) => {
                          
                          return (
                            <EZHistoryItem
                              userName={item.user.fullName}
                              userImage={item.user.picture}
                              key={index}
                              amount={item.amount}
                              transactionType={item.mutation_type.name}
                              accepted={item.mutation_type.name}
                            />
                          )
                        })
                      ) : (
                        <div className="text-center">
                          <p className='text-gray fs-5'>No transaction history</p>
                        </div>
                      )
                    }
                  </div>
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
