import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import EZAsideNavigation from '../../components/EZAsideNavigation'
import EZLayout from '../../components/EZLayout'
import { parsePhoneNumber } from 'libphonenumber-js'

import style from '../../styles/scss/PersonalInformation.module.scss'

export default function PersonalInfo() {
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

              <div className="edit-indo">
                <div className="info-item rounded shadow p-3 mb-3">
                  <p className='text-gray mb-1'>First name</p>
                  <p className='m-0 fs-5 fw-bold text-black'>User Name</p>
                </div>
                <div className="info-item rounded shadow p-3 mb-3">
                  <p className='text-gray mb-1'>Last name</p>
                  <p className='m-0 fs-5 fw-bold text-black'>User Name</p>
                </div>
                <div className="info-item rounded shadow p-3 mb-3">
                  <p className='text-gray mb-1'>Verified email</p>
                  <p className='m-0 fs-5 fw-bold text-gray'>user@email.mail</p>
                </div>
                <div className="info-item rounded shadow p-3  d-flex align-items-md-center justify-content-between">
                  <div className="wrapper-phone-number">
                    <p className='text-gray mb-1'>Phone number</p>
                    <p className='m-0 fs-5 fw-bold text-black'>{parsePhoneNumber('081290945780', 'ID').formatInternational()}</p>
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
