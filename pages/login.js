import {useRouter} from 'next/router'
import EZSideBanner from '../components/EZSideBanner';
import { useEffect, useState } from 'react';
import EZForm from '../components/auth/EZForm';
import Head from 'next/head';

export default function Login({readyToReset}) {
  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname || '');

  useEffect(() => {
    switch (router.pathname) {
      case '/login': {
        setPathName('login');
        break;
      }
      case '/register': {
        setPathName('register');
        break;
      }
      case '/forgot-password': {
        setPathName('forgot-password');
        break;
      }

      case '/create-pin': {
        setPathName('create-pin');
        break;
      }

      default: {
        setPathName('login');
      }
    }
  }, [router]);

  return (
    <>
      <Head>

      {
        pathName === 'login' && (
          <title>Login | EZ Wallet</title>
        )
      }
      {
        pathName === 'register' && (
          <title>Signup | EZ Wallet</title>
        )
      }
      {
        pathName === 'forgot-password' && (
          <title>Forgot Password | EZ Wallet</title>
        )
      }
      {
        pathName === 'create-pin' && (
          <title>Create Pin | EZ Wallet</title>
        )
      }

      </Head>
      <section className="row vh-100 align-items-center">
        <EZSideBanner wrapperClassName="banner h-100 col-lg-7 d-none d-lg-flex justify-content-center" />
        <div className="form col px-md-5 vh-100 overflow-auto">
          <div className="wrapper px-4 px-md-5 py-5">
            {
              (pathName === 'login' || pathName === 'register') && (
                <>
                  <p className='fw-bold fs-5 mb-4'>
                    Start Accessing Banking Needs
                    With All Devices and All Platforms
                    With 30.000+ Users
                  </p>
                  <p className='text-gray mb-5'>
                    Transfering money is eassier than ever, you can access EZ Wallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!
                  </p>
                </>
              )
            }
            {
              pathName === 'forgot-password' && (
                <>
                  <p className='fw-bold fs-5 mb-4'>
                    Did You Forgot Your Password?
                    Don’t Worry, You Can Reset Your
                    Password In a Minutes.
                  </p>
                  {
                    readyToReset ? (
                      <p className='text-gray mb-5'>
                        Now you can create a new password for your EZ Wallet account. Type your password twice so we can confirm your new passsword.
                      </p>
                    ) : (
                      <p className='text-gray mb-5'>
                        To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.
                      </p>
                    )
                  }
                </>

              )
            }
            {
              pathName === 'create-pin' && (
                <>
                  <p className='fw-bold fs-5 mb-4'>
                    Secure Your Account, Your Wallet,
                    and Your Data With 6 Digits PIN
                    That You Created Yourself.
                  </p>
                  <p className='text-gray mb-5'>
                    Create 6 digits pin to secure all your money and your data in Zwallet app. Keep it secret and don’t tell anyone about your Zwallet account password and the PIN.
                  </p>
                </>
              )
            }
            <EZForm path={pathName} readyToReset={readyToReset} />
          </div>
        </div>
      </section>
    </>
  )
}
