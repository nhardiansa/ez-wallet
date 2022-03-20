import React, { useState } from 'react'
import EZInput from '../../components/EZInput'
import EZLayout from '../../components/EZLayout'
import {MdOutlineLock} from 'react-icons/md'
import EZButton from '../../components/EZButton'
import style from '../../styles/scss/PersonalInformation.module.scss'
import { axiosInstance } from '../../helpers/http'
import validator from 'validator'
import qs from 'qs'
import { useRouter } from 'next/router'

export default function ChangePassword() {
  const router = useRouter()
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = () => {
    const {confirmPassword, currentPassword, newPassword} = password
    
    if (confirmPassword !== newPassword) {
      alert('Confirm password not match')
      return
    }

    if (currentPassword === newPassword) {
      alert('New password must be different from current password')
      return
    }

    const passwordRules = {
        hasUpperCase: true,
        hasLowerCase: true,
        hasNumbers: true,
        hasSpecialCharacters: true,
        minLength: 6,
    }

    if (!validator.isStrongPassword(newPassword, passwordRules)) {
      alert('Password must be at least 6 characters, contain uppercase, lowercase, numbers and special characters')
      return
    }

    const data = qs.stringify({
      oldPassword: currentPassword,
      newPassword,
      confirmPassword
    })

    sendRequest(data)
  }

  const sendRequest = async (data) => {
    try {
      setLoading(true)
      const result = await axiosInstance(true).patch('/profile/change-password', data)
      if (result.status === 200) {
        setLoading(false)
        alert(result.data.message)
        router.push('/profile')
      } else {
        setLoading(false)
        alert(result.data.message)
      }
    } catch (error) {
      console.error(error.response);
      setLoading(false)
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert('Something went wrong')
      }
    }
  }

  return (
    <EZLayout
      bgWhite={true}
      useHeaderFooter={true}
      pageTitle={'Change Password'}
      useNavigator={true}
    >
      <div className="change-password-wrapper p-4 pt-5 shadow rounded h-100">
        <h2 className='text-center text-md-start fs-5 fw-bold'>Change Password</h2>

        <p className='text-gray mt-4 text-center text-md-start'>
          You must enter your current password and then <br className='d-none d-md-block' /> type <br className='d-md-none' /> your new password twice.
        </p>

        <div className="outer d-flex justify-content-center">
          <div className={`${style['form-add-phone']} form-wrapper mt-5 d-flex flex-column`}>
            <EZInput
              icon={<MdOutlineLock />}
              placeholder='Current Password'
              type='password'
              name='currentPassword'
              wrapperClassName='mb-4'
              onChange={handleChange}
              value={password.currentPassword}
            />
            <EZInput
              icon={<MdOutlineLock />}
              placeholder='New Password'
              type='password'
              name='newPassword'
              wrapperClassName='mb-4'
              onChange={handleChange}
              value={password.newPassword}
            />
            <EZInput
              icon={<MdOutlineLock />}
              placeholder='Confirm Password'
              type='password'
              name='confirmPassword'
              wrapperClassName='mb-4'
              onChange={handleChange}
              value={password.confirmPassword}
            />
            <EZButton onClick={onSubmit} className={`${loading ? 'disabled' : ''} mt-4 py-md-3`}>
              {loading ? 'Loading...' : 'Change Password'}
            </EZButton>
          </div>
        </div>
      </div>
    </EZLayout>
  )
}
