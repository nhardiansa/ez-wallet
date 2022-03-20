import { useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import {BiPencil} from 'react-icons/bi'
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import EZButton from "../../components/EZButton";
import EZHistoryItem from "../../components/EZHistoryItem";
import EZInput from "../../components/EZInput";
import EZLayout from "../../components/EZLayout";
import EZModal from "../../components/EZModal";
import { useRouter } from "next/router";
import { setBalanceLeft, setDateTime, setNotes, setTransferAmount, sendMoney as sendMoneyAction, clearTransaction } from "../../redux/actions/transactionAction";
import qs from 'qs'

export default function InputAmount() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const {userReducer, transactionReducer} = useSelector(state => state);
  const {recepientDetail, currentBalance} = userReducer
  const {transferAmount, balanceLeft, dateTime, notes, loading} = transactionReducer

  const [confirm, setConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pinValue, setPinValue] = useState('');

  useEffect(() => {
    const recepientExist = Object.keys(recepientDetail).length;
    if (!recepientExist) {
      router.push('/transfer');
    }
    dispatch(clearTransaction());
  }, [])

  const dateOpt = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }

  const onPinChange = (value) => {
    setPinValue(value);
  }

  const confirmTransaction = () => {
    if (currentBalance < transferAmount) {
      alert('Insufficient balance, maximum transfer amount is Rp' + Number(currentBalance).toLocaleString('id-ID'));
      return false;
    }

    if (transferAmount < 1) {
      alert('Minimum transfer amount is Rp1');
      return false;
    }

    dispatch(setDateTime(new Date().toLocaleString('id-ID', dateOpt)))
    dispatch(setBalanceLeft(currentBalance - transferAmount))

    // alert('confirm')
    setConfirm(true)
  }

  const sendMoney = () => {
    const dataToSend = {
      amount: transferAmount,
      recipient: recepientDetail.id,
      pin: pinValue,
      notes
    }

    if (!confirm) {
      alert('Please confirm transaction before sending money')
      return false;
    }

    if (!pinValue || pinValue.length < 6) {
      alert('Please enter valid pin')
      return false;
    }

    if (!transferAmount && !dataToSend.recipient) {
      alert('Please enter valid data')
      return false;
    }

    const data = qs.stringify(dataToSend);
    console.log(data);

    dispatch(sendMoneyAction(data))
    router.push('/transfer/result');
  }
  return (
    <>
      <EZLayout
        bgWhite={true}
        pageTitle={`Transfer`}
        useHeaderFooter={true}
        useNavigator={true}
      >
        <div className="send-money-wrapper rounded shadow p-3 h-100 overflow-auto">
          <h1 className="fs-5 fw-bold text-center text-md-start">{
            confirm ? `Transfer to` : `Transfer Money`
          }</h1>

          <EZHistoryItem
            wrapperClassname='rounded shadow p-4'
            userName={recepientDetail.fullName}
            accepted={recepientDetail.phone.length ? recepientDetail.phone[0].number : 'No phone number'}
            userImage={recepientDetail.picture}
          />

          {
            !confirm ? (
              <div className="input-amount mt-5">
                <p className="text-gray">
                  Type the amount you want to transfer and then <br className="d-none d-md-block" /> press continue to the next steps.
                </p>

                <div className="input-wrapper d-flex flex-column align-items-center mb-3">
                  <InputGroup className=" w-50">
                    <FormControl
                      placeholder="0.00"
                      aria-label="0.00"
                      aria-describedby="basic-addon1"
                      className="border-0 rounded-0 text-center box-shadow-0 fs-1 fw-bolder text-primary"
                      type="number"
                      onChange={(e) => {dispatch(setTransferAmount(e.target.value))}}
                    />
                  </InputGroup>
                  <p className="current-balance fw-bold mt-3">Rp{Number(currentBalance).toLocaleString('id-ID')} Available </p>

                  <EZInput
                    icon={<BiPencil />}
                    wrapperClassName='w-75 mt-5'
                    placeholder='Add some notes'
                    onChange={(e) => {dispatch(setNotes(e.target.value))}}
                  />
                </div>

                <div className="btn-wrapper d-flex justify-content-end mt-5">
                  <EZButton onClick={confirmTransaction} className='py-md-3 px-md-5'>Continue</EZButton>
                </div>
              </div>
            ) : (
              <>
                <div className="confirm-section mt-5 h-100">
                  <h2 className="fs-5 fw-bold text-center text-md-start mb-4">Details</h2>

                  <div className="info-item rounded shadow p-3 mb-3">
                    <p className='text-gray mb-1'>Amount</p>
                    <p className='m-0 fs-5 fw-bold text-black'>Rp {Number(transferAmount).toLocaleString('id-ID')}</p>
                  </div>

                  <div className="info-item rounded shadow p-3 mb-3">
                    <p className='text-gray mb-1'>Balance Left</p>
                    <p className='m-0 fs-5 fw-bold text-black'>Rp {Number(balanceLeft).toLocaleString('id-ID')}</p>
                  </div>

                  <div className="info-item rounded shadow p-3 mb-3">
                    <p className='text-gray mb-1'>Date & Time</p>
                    <p className='m-0 fs-5 fw-bold text-black'>{ dateTime }</p>
                  </div>

                  <div className="info-item rounded shadow p-3 mb-3">
                    <p className='text-gray mb-1'>Notes</p>
                    <p className='m-0 fs-5 fw-bold text-black'>{ notes ? notes : '-' }</p>
                  </div>

                  <div className="btn-wrapper d-flex justify-content-end mt-4">
                    <EZButton onClick={() => setShowModal(true)} className='py-md-3 px-md-5'>Continue</EZButton>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </EZLayout>
      <EZModal
        show={showModal}
        onHide={() => setShowModal(false)}
        modalTitle='Enter PIN to Transfer'
        onConfirm={sendMoney}
        loading={loading}
        modalBody={
          <>
            <p className="text-gray mb-5">
              Enter your 6 digits PIN for confirmation to <br className="d-none d-md-block" /> continue <br className="d-md-none" /> transferring money. 
            </p>
            <OtpInput
              containerStyle='w-100 justify-content-between mb-5'
              inputStyle='py-2 py-md-3 py-lg-4 w-100 mx-1 mx-md-2 mx-lg-4 fw-bold fs-3 border rounded'
              onChange={onPinChange}
              value={pinValue}
              numInputs={6}
              // isInputNum={true}
            />
          </>
        }
      />
    </>
  )
}
