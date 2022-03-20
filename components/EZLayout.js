import EZNavbar from './EZNavbar';
import EZFooter from './EZFooter';
import EZAsideNavigation from './EZAsideNavigation';
import style from '../styles/scss/EZLayout.module.scss';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBalance, getUserProfile } from '../redux/actions/userAction';

export default function EZLayout({ children, useHeaderFooter, bgWhite, useNavigator, pageTitle }) {

  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.userReducer);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const profileLength = Object.keys(userProfile).length;

    if (token && !profileLength) {
      dispatch(getUserProfile());
    }

    dispatch(getCurrentBalance());
  }, []);

  return (
    <>
    {
      pageTitle && (
      <Head>
        <title>{pageTitle}</title>
      </Head>
      )
    }
      <EZNavbar bgWhite={bgWhite} />
        <div className={`${style['container-layout']} container`}>
          {
            useNavigator && (
              <div className="row h-100">
                  <div className="col-lg-3 d-none d-lg-block h-100">
                    <EZAsideNavigation />
                  </div>
                  <div className="col h-100 overflow-auto">
                    {children}
                  </div>
              </div>
            )
          }
          {
            !useNavigator && children
          }
        </div>
      <EZFooter useHeader={useHeaderFooter} />
    </>
  )
}
