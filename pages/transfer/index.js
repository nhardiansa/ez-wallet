import React, { useEffect } from 'react'
import EZInput from '../../components/EZInput'
import EZLayout from '../../components/EZLayout'
import {BiSearch} from 'react-icons/bi'
import { FormControl, InputGroup } from 'react-bootstrap';
import EZHistoryItem from '../../components/EZHistoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { getListUser, setRecepientDetail } from '../../redux/actions/userAction';
import { parsePhoneNumber } from 'libphonenumber-js'
import { useRouter } from 'next/router';
import { clearTransaction } from '../../redux/actions/transactionAction';

export default function Transer() {
  const router = useRouter()
  const dispatch = useDispatch()
  const userReducer = useSelector(state => state.userReducer);
  const {userList, error, loading, userProfile} = userReducer

  useEffect(() => {
    dispatch(getListUser())
    dispatch(clearTransaction())
  }, [])

  const transferTo = (recepientId) => {
    const userDetail = userList.find(el => el.id === recepientId)
    dispatch(setRecepientDetail(userDetail))
    router.push(`/transfer/${userDetail.id}`)
  }

  return (
    <EZLayout pageTitle='Transfer' useNavigator={true} bgWhite={true} useHeaderFooter={true}>
      <div className="transfer-wrapper h-100 shadow rounded p-3">
        <h1 className='text-capitalize fw-bold fs-5'>Select receiver</h1>

        <InputGroup className="my-4">
          <InputGroup.Text id="basic-addon1" className='text-gray bg-secondary border-end-0 py-3'>
            <BiSearch />
          </InputGroup.Text>
          <FormControl
            className='border-start-0 bg-secondary text-gray'
            placeholder="Search receiver here"
            aria-label="Search receiver here"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <div className="user-list h-100 overflow-auto">
          {
            loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            ) : (
              ''
            )
          }
          {
            error && (
              <div className="d-flex justify-content-center align-items-center h-100">
                <p className="text-danger fs-5">{error}</p>
              </div>
            )
          }
          {
            userList.length ? (
              userList.map((user, index) => {
                const phone = user.phone[0]
                return (
                  <EZHistoryItem
                    key={index}
                    onClick={() => transferTo(user.id)}
                    userName={user.fullName}
                    userImage={user.picture}
                    accepted={phone ? parsePhoneNumber(phone.number, 'ID').formatInternational() : ''}
                    wrapperClassname='rounded shadow p-3 mb-3'
                  />
                )
              })
            ) : (
              ''
            )
          }
          {
            (!userList.length && !loading) && (
              <div className="d-flex justify-content-center align-items-center h-100">
                <p className="text-gray fs-5">No user found</p>
              </div>
            )
          }
        </div>
      </div>
    </EZLayout>
  )
}
