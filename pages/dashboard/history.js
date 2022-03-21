import { Dropdown } from 'react-bootstrap';
import Head from 'next/head'
import { useEffect} from 'react'
import { DropdownButton, } from 'react-bootstrap'
import EZAsideNavigation from '../../components/EZAsideNavigation'
import EZLayout from '../../components/EZLayout'

import style from '../../styles/scss/EZHistory.module.scss'
import EZHistoryItem from '../../components/EZHistoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { getHistories } from '../../redux/actions/historyAction';

export default function History() {
  const dispatch = useDispatch();
  const {historyReducer} = useSelector(state => state);
  const {histories, loading, error} = historyReducer;

  useEffect(() => {
    getHistorieyList();
  }, [])

  const getHistorieyList = () => {
    dispatch(getHistories());
  }

  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <EZLayout bgWhite={true} useHeaderFooter={true}>
        <div className="row h-100">
          <div className="col-lg-3 d-none d-lg-block">
            <EZAsideNavigation />
          </div>
          <div className="col">
            <div className="wrapper p-3 px-lg-4 rounded shadow">
              <div className="history-head d-md-flex justify-content-between">
                <h1 className="fs-5 text-center fw-bold my-3">Transaction History</h1>
                <DropdownButton
                  variant="secondary"
                  title="Select Filter"
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Separated link</Dropdown.Item>
                </DropdownButton>
              </div>
              <div className={`${style['history-wrapper']} overflow-auto history-list mt-3`}>
              {/* <div className={`h-100 overflow-auto history-list mt-3`}> */}
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
                  (histories.length && !loading && !error) ? (
                    histories.map((item, index) => {
                      return (
                        <EZHistoryItem
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
                {/* {
                  [...Array(10)].map((item, index) => {
                    return (
                      <EZHistoryItem
                        key={index}
                        amount={10000}
                        transactionType={'Transfer'}
                      />
                    )
                  })
                } */}
              </div>
            </div>
          </div>
        </div>
      </EZLayout>
    </>
  )
}
