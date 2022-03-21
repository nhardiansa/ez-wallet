import Head from 'next/head'
import React, { useState } from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {HiOutlinePencil} from 'react-icons/hi'
import EZAsideNavigation from '../../components/EZAsideNavigation'
import EZLayout from '../../components/EZLayout'

import imagePlaceholder from '../../public/images/testi-placeholder.jpg'
import EZButton from '../../components/EZButton'

import style from '../../styles/scss/Profile.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { HasLogged, MustLogin } from '../../components/AuthWrapper'
import { parsePhoneNumber } from 'libphonenumber-js'
import Swal from 'sweetalert2'
import { getUserProfile } from '../../redux/actions/userAction'
import { axiosInstance } from '../../helpers/http'

function Profile() {
  const router = useRouter()
  const dispatch = useDispatch()
  const {userReducer} = useSelector(state => state)
  const {userPhoneList, userProfile} = userReducer
  const {fullName} = userProfile

  const [loading, setLoading] = useState(false)

  const logOutHandler = () => {
    const confirm = window.confirm('Are you sure you want to log out?');

    if (!confirm) {
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
    router.push('/login');
    setIsLogged(false);
  }

  const changeHandler = async (e) => {
    const {isConfirmed} = await Swal.fire({
      title: 'Are you sure to change your profile picture?',
      text: "You can change it again if you want",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1c7e36',
      cancelButtonColor: '#d33',
    })

    if (!isConfirmed) {
      return;
    }

    const reader = new FileReader();
    const image = e.target.files[0];
    const formData = new FormData();

    reader.readAsDataURL(image);
    const imageProfile = document.querySelector('#image-profile');
    
    reader.onload = (e) => {
      imageProfile.srcset = e.target.result;
    };

    formData.append('picture', image);

    sendUpdateProfile(formData)
  }

  const sendUpdateProfile = async (data) => {
    try {
      setLoading(true)
      const response = await axiosInstance(true, true).patch('/profile', data);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Your profile has been updated',
          icon: 'success',
        })
        dispatch(getUserProfile())
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
      const message = error.response ? error.response.data.message : error.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      })
      setLoading(false)
    }
  }

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
                {
                  loading ? (
                    <div style={{width: 50, height: 50}} className="spinner-border text-primary" role="status"></div>
                  ) : (
                    <>
                      <div className="image-wrapper d-flex justify-content-center">
                        <Image id='image-profile' src={userProfile.picture || imagePlaceholder} height={80} width={80} className="rounded d-block" />
                      </div>
                      <div className='d-flex flex-column align-items-center justify-content-center mt-3 text-gray position-relative'>
                        <span style={{cursor: 'pointer'}} ><HiOutlinePencil className='me-1' />Edit</span>
                        <input onChange={changeHandler} className={`${style['file-input']}`} type='file' />
                      </div>
                    </>
                  )
                }
                <h1 className='text-center fw-bold mt-4 fs-3 text-black text-capitalize'>{fullName ? fullName :'unknown'}</h1>
                <h2 className='text-center fs-6 mt-2 text-gray'>
                  {
                    userPhoneList.length > 0 ? (
                      userPhoneList[0] ? (
                        parsePhoneNumber(userPhoneList[0].number, 'ID').formatInternational()
                      ) : 'Phone number not set yet'
                    ) : 'Phone number not set yet'
                  }
                </h2>

                <div className={`${style.action} other-action d-flex flex-column mt-5 mt-md-2 mt-lg-5`}>
                  <EZButton onClick={() => router.push('/profile/personal-info')} variant='white' className='mt-3 py-3' >Personal Information</EZButton>
                  <EZButton onClick={() => router.push('/profile/change-password')} variant='white' className='mt-3 py-3' >Change Password</EZButton>
                  <EZButton onClick={() => router.push('/profile/change-pin')} variant='white' className='mt-3 py-3' >Change PIN</EZButton>
                  <EZButton onClick={logOutHandler} variant='white' className='mt-3 py-3' >Logout</EZButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EZLayout>
    </>
  )
}

// export default MustLogin(Profile)
export default Profile
