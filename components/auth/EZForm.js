import Link from 'next/link'
import { useEffect } from 'react'
import {HiOutlineMail} from 'react-icons/hi'
import {MdOutlineLock} from 'react-icons/md'
import {BiUser} from 'react-icons/bi'
import EZButton from '../EZButton'
import EZInput from '../EZInput'

export default function EZForm({path}) {
  useEffect(() => {
    console.log(path)
  },[path]);
  return (
    <>
      <form className='d-flex flex-column align-items-end'>
        {
          (path === 'login' || path === 'register') && (
            <>
              {
                path === 'register' && (
                  <>
                    <EZInput
                      wrapperClassName='mb-4 mb-md-5'
                      icon={<BiUser />}
                      placeholder='Enter your firstname'
                      name='firstname'
                    />
                    <EZInput
                      wrapperClassName='mb-4 mb-md-5'
                      icon={<BiUser />}
                      placeholder='Enter your lastname'
                      name='lastname'
                    />
                  </>
                )
              }
              <EZInput
                wrapperClassName='mb-4 mb-md-5'
                icon={<HiOutlineMail />}
                placeholder='Enter your e-mail'
                name='email'
                />
              <EZInput
                wrapperClassName={'mb-3'}
                icon={<MdOutlineLock />}
                placeholder='Enter your password'
                name='password'
              />
              {
                path === 'login' && (
                  <Link href='/forgot-password'>
                    <a className='text-gray'>Forgot password?</a>
                  </Link>
                )
              }
            </>
          )
        }

        <EZButton className='w-100 py-2 py-md-3 my-4'>
          {
            path === 'login' && "Login"
          }
          {
            path === 'register' && "Register"
          }
        </EZButton>
      </form>
      {
        path === 'login' && (
          <p className='text-center text-gray'>Don’t have an account? Let’s  
            <Link href='/register'>
              <a className='fw-bold'> Sign Up</a>
            </Link>
          </p>
        )
      }
      {
        path === 'register' && (
          <p className='text-center text-gray'>Already have an account? Let’s  
            <Link href='/login'>
              <a className='fw-bold'> Login</a>
            </Link>
          </p>
        )
      }
    </>
    
  )
}
