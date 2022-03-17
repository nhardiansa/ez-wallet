import Link from 'next/link';
import {HiOutlineMail} from 'react-icons/hi'
import {MdOutlineLock} from 'react-icons/md'
import EZInput from "../components/EZInput";
import EZButton from "../components/EZButton";
import EZSideBanner from '../components/EZSideBanner';

export default function Login() {
  return (
    <section className="row vh-100 align-items-center">
      <EZSideBanner wrapperClassName="banner vh-100 col-lg-7 d-none d-lg-flex justify-content-center" />
      <div className="form col px-md-5">
        <div className="wrapper px-4 px-md-5 py-5">
          <p className='fw-bold fs-5 mb-5'>
            Start Accessing Banking Needs
            With All Devices and All Platforms
            With 30.000+ Users
          </p>
          <p className='text-gray mb-5'>
            Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!
          </p>
          <form className='d-flex flex-column align-items-end'>
            <EZInput
              wrapperClassName='mb-4 mb-md-5'
              icon={<HiOutlineMail />}
              placeholder='Enter your e-mail'
            />
            <EZInput
              wrapperClassName={'mb-4'}
              icon={<MdOutlineLock />}
              placeholder='Enter your password'
            />
            <Link href='/forgot-password'>
              <a className='text-gray mb-4'>Forgot password?</a>
            </Link>

            <EZButton className='w-100 py-2 py-md-3 mb-4'>Login</EZButton>
          </form>
          <p className='text-center text-gray'>Don’t have an account? Let’s  
            <Link href='/register'>
              <a className='fw-bold'> Sign Up</a>
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
