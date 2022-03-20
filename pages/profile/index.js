import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {HiOutlinePencil} from 'react-icons/hi'
import EZAsideNavigation from '../../components/EZAsideNavigation'
import EZLayout from '../../components/EZLayout'

import imagePlaceholder from '../../public/images/testi-placeholder.jpg'
import EZButton from '../../components/EZButton'

import style from '../../styles/scss/Profile.module.scss'
import { useSelector } from 'react-redux'

export default function Profile() {
  const router = useRouter()
  const {userReducer} = useSelector(state => state)
  const {fullName, email, phoneNumber, address} = userReducer.userProfile

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <EZLayout useHeaderFooter={true} bgWhite={true}>
        <div className="row h-100">
          <div className="col-lg-3 d-none d-lg-block h-100">
            <EZAsideNavigation />
          </div>
          <div className="col h-100 overflow-auto">
            <div className="wrapper-profile rounded shadow p-3 pb-lg-5 pt-lg-4">
              <div className="profile-head d-flex flex-column align-items-center">
                <div className="image-wrapper d-flex justify-content-center">
                  <Image src={imagePlaceholder} height={80} width={80} className="rounded d-block" />
                </div>
                <div className='d-flex align-items-center justify-content-center mt-3 text-gray'>
                  <HiOutlinePencil className='me-1' /> Edit
                </div>
                <h1 className='text-center fw-bold mt-4 fs-3 text-black'>{fullName ? fullName :'Unknown'}</h1>
                <h2 className='text-center fs-6 mt-2 text-gray'>081290945780</h2>

                <div className={`${style.action} other-action d-flex flex-column mt-5 mt-md-2 mt-lg-5`}>
                  <EZButton onClick={() => router.push('/profile/personal-info')} variant='white' className='mt-3 py-3' >Personal Information</EZButton>
                  <EZButton onClick={() => router.push('/profile/change-password')} variant='white' className='mt-3 py-3' >Change Password</EZButton>
                  <EZButton onClick={() => router.push('/profile/change-pin')} variant='white' className='mt-3 py-3' >Change PIN</EZButton>
                  <EZButton variant='white' className='mt-3 py-3' >Logout</EZButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EZLayout>
    </>
  )
}
