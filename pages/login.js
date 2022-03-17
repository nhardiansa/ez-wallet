import {useRouter} from 'next/router'
import Link from 'next/link';
import {HiOutlineMail} from 'react-icons/hi'
import {MdOutlineLock} from 'react-icons/md'
import EZInput from "../components/EZInput";
import EZButton from "../components/EZButton";
import EZSideBanner from '../components/EZSideBanner';
import { useEffect, useState } from 'react';
import EZForm from '../components/auth/EZForm';

export default function Login() {
  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname);

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

      default: {
        setPathName('login');
      }
    }
  }, [router]);

  return (
    <section className="row vh-100 align-items-center">
      <EZSideBanner wrapperClassName="banner h-100 col-lg-7 d-none d-lg-flex justify-content-center" />
      <div className="form col px-md-5 vh-100 overflow-auto">
        <div className="wrapper px-4 px-md-5 py-5">
          <p className='fw-bold fs-5 mb-4'>
            Start Accessing Banking Needs
            With All Devices and All Platforms
            With 30.000+ Users
          </p>
          <p className='text-gray mb-5'>
            Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!
          </p>
          <EZForm path={pathName} />
        </div>
      </div>
    </section>
  )
}
