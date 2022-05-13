import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import EZButton from '../../components/EZButton'
import EZInput from '../../components/EZInput'
import EZLayout from '../../components/EZLayout'
import validator from 'validator'
import qs from 'qs'

import style from '../../styles/scss/PersonalInformation.module.scss'
import { axiosInstance } from '../../helpers/http'
import { useRouter } from 'next/router'

export default function ChangePin() {
  const router = useRouter()
  const [addNewpin, setAddNewpin] = useState(false)
  const [loading, setLoading] = useState(false)

  const [pin, setPin] = useState({
    oldPin: '',
    newPin: '',
  });

  const changeHandler = (e) => {
    const name = addNewpin ? 'newPin' : 'oldPin'

    console.log(e);
    setPin({
      ...pin,
      [name]: e,
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!addNewpin) {
      setAddNewpin(true)
      return
    }

    if (addNewpin) {
      if (!pin.oldPin || !pin.newPin) {
        alert('Pin cannot be empty');
        return;
      }
  
      if (pin.newPin === pin.oldPin) {
        alert('Your new pin must be different from your old pin');
        return;
      }
  
      if (pin.newPin.length < 6 || pin.oldPin.length < 6) {
        alert('Pin must be at least 6 characters');
        return;
      }
  
      if (!validator.isNumeric(pin.newPin) || !validator.isNumeric(pin.oldPin)) {
        alert('Pin must only contain numbers');
        return;
      }
  
      const data = qs.stringify(pin);
  
      // alert(data);
      sendRequest(data);
    }
  }

  const sendRequest = async (data) => {
    try {
      setLoading(true)
      const response = await axiosInstance(true).patch(`/profile/change-pin`, data)
      setLoading(false)
      alert(response.data.message)
      router.push('/profile')
    } catch (error) {
      let message;
      if (!error.response) {
        message = error.message
      } else {
        message = error.response.data.message
      }
      console.error(error);
      setLoading(false)
      setAddNewpin(false)
      setPin({
        oldPin: '',
        newPin: '',
      })
      alert(message)
    }
  }

  return (
    <EZLayout pageTitle={'Change PIN'} bgWhite={true} useHeaderFooter={true} useNavigator={true}>
        <div className="manage-phone rounded shadow h-100 p-3 mb-3 mb-lg-0">
          <h1 className='fw-bold fs-5 text-capitalize'>Change PIN</h1>
          <p className={`${style.desc} text-gray mt-4`}>
            {
              addNewpin ? (
                  'Type your new 6 digits security PIN to use in Zwallet.'
                ) : (
                  'Enter your current 6 digits Zwallet PIN below to continue to the next steps.'
              )
            }
          </p>
          <div className="add-phone-number">
            <div className="input-pin mt-5 d-flex justify-content-center">
              <form onSubmit={submitHandler} className={`${style['form-add-phone']} d-flex flex-column`}>
                <OtpInput
                  containerStyle='w-100 justify-content-between'
                  inputStyle='py-2 w-100 mx-1 mx-lg-2 py-lg-3 fw-bold fs-3 border rounded'
                  onChange={changeHandler}
                  value={addNewpin ? pin.newPin : pin.oldPin}
                  numInputs={6}
                  isInputNum={true}
                  isDisabled={loading}
                />
                <EZButton type='submit' className={`${loading ? 'disabled' : ''} ${pin.oldPin.length < 6 ? 'disabled' : ''} ${(pin.newPin.length < 6 && addNewpin) ? 'disabled' : ''} mt-5 py-3`}>
                  {
                    <>
                    {
                      !loading && (
                        (addNewpin) ? 'Change PIN' : 'Continue'
                      )
                    }
                    </>
                  }
                  {
                    loading && "Changing PIN..."
                  }
                </EZButton>
              </form>
            </div>
          </div>
        </div>
      </EZLayout>
  )
}
