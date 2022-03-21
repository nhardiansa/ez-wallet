import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import EZAsideNavigation from '../../components/EZAsideNavigation'
import EZLayout from '../../components/EZLayout'
import { parsePhoneNumber } from 'libphonenumber-js'
import Swal from 'sweetalert2'
import qs from 'qs'

import style from '../../styles/scss/PersonalInformation.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import EZInput from '../../components/EZInput'
import { getUserProfile } from '../../redux/actions/userAction'
import { axiosInstance } from '../../helpers/http'

export default function PersonalInfo() {
  const dispatch = useDispatch()
  const { userReducer } = useSelector(state => state)
  const { userPhoneList, userProfile } = userReducer

  const [defaultProfile, setDefaultProfile] = useState({
    firstName: '',
    lastName: ''
  })

  useEffect(() => {
    if (userProfile.fullName) {
      setDefaultProfile({
        firstName: userProfile.fullName ? userProfile.fullName.split(' ')[0] : '',
        lastName: userProfile.fullName ? userProfile.fullName.split(' ')[1] : ''
      })
    }
  }, [userProfile])

  const changeHandler = (e) => {
    const {name, value} = e.target

    setDefaultProfile({
      ...defaultProfile,
      [name]: value.trim()
    })
  }

  const blurHandler = (e) => {
    const data = {
      fullName: `${defaultProfile.firstName} ${defaultProfile.lastName}`
    }

    if (userProfile.fullName === data.fullName) {
      return
    }

    const params = qs.stringify(data)
    sendUpdateRequest(params)
  }

  const sendUpdateRequest = async (data) => {
    try {
      const response = await axiosInstance(true).patch('/profile', data)
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Your profile has been updated',
          icon: 'success'
        })
        dispatch(getUserProfile())
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: error.response ? error.response.data.message : error.response.message,
        icon: 'error',
      })
    }
  }

  return (
    <>
      <Head>
        <title>Personal Information</title>
      </Head>
      <EZLayout useHeaderFooter={true} bgWhite={true}>
        <div className="row h-100">
          <div className="col-lg-3 d-none d-lg-block h-100">
            <EZAsideNavigation />
          </div>
          <div className="col h-100 overflow-auto">
            <div className="wrapper-profile rounded shadow p-md-4 p-3 pb-lg-5 pt-lg-4">
              <h1 className='fw-bold fs-5'>Personal Information</h1>
              <p className={`${style.desc} text-gray mt-4`}>
                We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.
              </p>

              <div onfoc className="edit-indo">
                <div className="info-item rounded shadow p-3 mb-3">
                  <p className='text-gray mb-1'>
                    First name
                  </p>
                  {/* <p className='m-0 fs-5 fw-bold text-black text-capitalize'>
                    {
                      userProfile.fullName ? userProfile.fullName.split(' ')[0] : 'unknown'
                    }
                  </p> */}
                  <EZInput
                    value={defaultProfile.firstName}
                    name='firstName'
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    inputClassName='ps-0 pb-0 fs-5 fw-bold text-black text-capitalize'
                  />
                </div>
                <div className="info-item rounded shadow p-3 mb-3">
                  <p className='text-gray mb-1'>Last name</p>
                  {/* <p className='m-0 fs-5 fw-bold text-black text-capitalize'>
                    {
                      userProfile.fullName ? userProfile.fullName.split(' ')[1] : '-'
                    }
                  </p> */}
                  <EZInput
                    value={defaultProfile.lastName}
                    name='lastName'
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    inputClassName='ps-0 pb-0 fs-5 fw-bold text-black text-capitalize'
                  />
                </div>
                <div className="info-item rounded shadow p-3 mb-3">
                  <p className='text-gray mb-1'>Verified email</p>
                  <p className='m-0 fs-5 fw-bold text-gray'>
                    {
                      userProfile.email ? userProfile.email : 'Not set yet'
                    }
                  </p>
                </div>
                <div className="info-item rounded shadow p-3  d-flex align-items-md-center justify-content-between">
                  <div className="wrapper-phone-number">
                    <p className='text-gray mb-1'>Phone number</p>
                    <p className='m-0 fs-5 fw-bold text-black'>
                    {
                      userPhoneList.length > 0 ? (
                        userPhoneList[0] ? (
                          parsePhoneNumber(userPhoneList[0].number, 'ID').formatInternational()
                        ) : 'Not set yet'
                      ) : 'Not set yet'
                    }
                    </p>
                  </div>
                  <Link href='/profile/manage-phone'>
                    <a className='text-primary fw-bold'>Manage</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EZLayout>
    </>
  )
}
