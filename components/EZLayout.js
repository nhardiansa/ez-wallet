import EZNavbar from './EZNavbar';
import EZModal from './EZModal';
import EZFooter from './EZFooter';
import EZAsideNavigation from './EZAsideNavigation';
import style from '../styles/scss/EZLayout.module.scss';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBalance, getUserProfile } from '../redux/actions/userAction';
import {showModal as showModalAction} from '../redux/actions/transactionAction';
import { FormControl, InputGroup } from 'react-bootstrap';
import validator from 'validator';
import { axiosInstance } from '../helpers/http';
import qs from 'qs';

export default function EZLayout({ children, useHeaderFooter, bgWhite, useNavigator, pageTitle }) {

  const dispatch = useDispatch();
  const { userReducer, transactionReducer } = useSelector(state => state);
  const { userProfile } = userReducer
  const { showModal } = transactionReducer;

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const profileLength = Object.keys(userProfile).length;

    if (token && !profileLength) {
      dispatch(getUserProfile());
    }

    dispatch(getCurrentBalance());
  }, []);

  const handleChange = (e) => {
    setAmount(e.target.value);
  }
  
  const topUp = () => {
    
    if (validator.isEmpty(amount) || Number(amount) < 10000) {
      alert('Minimal amount is Rp. 10.000');
      return;
    }
    
    if (!validator.isInt(amount)) {
      alert('Amount must be a valid number');
      return;
    }

    const data = qs.stringify({
      amount
    })

    sendRequest(data);
  }

  const sendRequest = async (data) => {
    try {
      setLoading(true);
      const result = await axiosInstance(true).post('/transactions/topup', data);
      setLoading(false);
      setAmount('');
      alert(result.data.message);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setAmount('');
      alert('Something went wrong');
    }
  }

  return (
    <>
    {
      pageTitle && (
      <Head>
        <title>{pageTitle}</title>
      </Head>
      )
    }
      <EZNavbar bgWhite={bgWhite} />
        <div className={`${style['container-layout']} container`}>
          {
            useNavigator && (
              <div className="row h-100">
                  <div className="col-lg-3 d-none d-lg-block h-100">
                    <EZAsideNavigation />
                  </div>
                  <div className="col h-100 overflow-auto">
                    {children}
                  </div>
              </div>
            )
          }
          {
            !useNavigator && children
          }
        </div>
      <EZFooter useHeader={useHeaderFooter} />
      <EZModal
        modalSize={'sm'}
        show={showModal}
        onHide={() => dispatch(showModalAction(false))}
        modalTitle='Topup'
        onConfirm={topUp}
        loading={loading}
        submitName='Topup'
        modalBody={
          <>
            <p className="text-gray mb-5">
              Enter the amount of money, and click submit
            </p>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="0.00"
                aria-label="0.00"
                aria-describedby="basic-addon1"
                type='number'
                value={amount}
                className='text-center py-2 fs-4 fw-bold'
                onChange={handleChange}
              />
            </InputGroup>
          </>
        }
      />
    </>
  )
}
