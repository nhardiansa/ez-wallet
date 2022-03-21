import {FiTrash} from 'react-icons/fi'
import EZLayout from '../../components/EZLayout'
import EZInput from '../../components/EZInput'
import { parsePhoneNumber } from 'libphonenumber-js'
import {BsTelephone} from 'react-icons/bs'

import style from '../../styles/scss/PersonalInformation.module.scss'
import { useEffect, useState } from 'react'
import EZButton from '../../components/EZButton'
import { useSelector } from 'react-redux'
import validator from 'validator'
import { axiosInstance } from '../../helpers/http'
import qs from 'qs'
import { useDispatch } from 'react-redux'
import { addPhoneNumber as addPhoneNumberAction, getPhoneList } from '../../redux/actions/userAction'

export default function ManagePhone() {
  const dispatch = useDispatch()
  const { userReducer } = useSelector(state => state);
  const { userPhoneList } = userReducer;
  const [addPhoneNumber, setAddPhoneNumber] = useState(false)
  const [loading, setLoading] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    console.log(userPhoneList.length);
    if (userPhoneList.length === 0) {
      setAddPhoneNumber(true)
    } else {
      setAddPhoneNumber(false)
    }
  }, [userReducer])

  const deleteHandler = (e) => {
    const id = e.target.id

    const decide = window.confirm(`Are you sure you want to delete this phone number?`)

    if (decide) {
      sendRequestDelete(id)
    }
  }

  const changeHandler = (e) => {
    const {name} = e.target
    if (name === 'phoneNumber') {
      setPhoneNumber(e.target.value)
    }
  }

  const addPhoneNumberHandler = () => {
    const number = '0' + phoneNumber
    if (validator.isEmpty(number) || !validator.isMobilePhone(number, 'id-ID')) {
      alert('Phone number is not valid')
      return
    }

    const data = qs.stringify({
      number
    })

    // console.log(data);
    sendRequest(data)
    // dispatch(addPhoneNumberAction(data))
  }

  const sendRequest = async (data) => {
    try {
      setLoading(true)
      const response = await axiosInstance(true).post('/profile/phones', data)
      setLoading(false)
      alert(response.data.message)
      dispatch(getPhoneList())
    } catch (error) {
      let message;
      if (!error.response) {
        message = error.message
      } else {
        message = error.response.data.message
      }
      console.error(error);
      setLoading(false)
      alert(message)
    }
  }

  const sendRequestDelete = async (id) => {
    try {
      setLoading(true)
      const response = await axiosInstance(true).delete(`/profile/phones/${id}`)
      setLoading(false)
      alert(response.data.message)
      dispatch(getPhoneList())
    } catch (error) {
      let message;
      if (!error.response) {
        message = error.message
      } else {
        message = error.response.data.message
      }
      console.error(error);
      setLoading(false)
      alert(message)
    }
  }

  return (
    <>
      <EZLayout pageTitle={'Manage Phone'} bgWhite={true} useHeaderFooter={true} useNavigator={true}>
        <div className="manage-phone rounded shadow h-100 p-3 mb-3 mb-lg-0">
          <h1 className='fw-bold fs-5 text-capitalize'>
              {
                addPhoneNumber ? (
                  'Add Phone Number'
                  ) : (
                  'Manage phone number'
                )
              }
            </h1>
          <p className={`${style.desc} text-gray mt-4`}>
            {
              addPhoneNumber ? (
                  'Add at least one phone number for the transfer ID so you can start transfering your money to another user.'
                ) : (
                  'You can only delete the phone number and then you must add another phone number.'
              )
            }
          </p>

          {
            !addPhoneNumber && (
              <div className="phone-numbers mt-5">
                <div className="info-item rounded shadow p-3  d-flex align-items-md-center justify-content-between">
                  <div className="wrapper-phone-number">
                    <p className='text-gray mb-1'>Phone number</p>
                    <p className='m-0 fs-5 fw-bold text-black'>{parsePhoneNumber('081290945780', 'ID').formatInternational()}</p>
                  </div>
                  <div onClick={deleteHandler} id='1' className="delete-icon me-md-3 pe-auto" style={{cursor: 'pointer'}}>
                    <FiTrash id='1' className='fs-3 text-danger pe-auto' style={{cursor: 'pointer'}} />
                  </div>
                </div>
              </div>
            )
          }
          {addPhoneNumber && (
            <div className="add-phone-number">
              <div className="input-phone-number mt-5 d-flex justify-content-center">
                <form className={`${style['form-add-phone']} d-flex flex-column`}>
                  <EZInput
                    icon={<span>
                      <BsTelephone className='fs-5' /> <span className='fs-6 ms-md-3'>+62</span>
                    </span>}
                    type='number'
                    placeholder='Enter your phone number'
                    inputClassName='pb-1 pb-md-0 ps-0'
                    name='phoneNumber'
                    onChange={changeHandler}
                    value={phoneNumber}
                  />
                  <EZButton onClick={addPhoneNumberHandler} className={`${loading ? 'disabled' : ''} mt-5 py-3`}>
                    {
                      loading ? 'Loading...' : 'Add phone number'
                    }
                  </EZButton>
                </form>
              </div>
            </div>
          )}
        </div>
      </EZLayout>
    </>
  )
}
