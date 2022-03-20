import EZNavbar from './EZNavbar';
import EZFooter from './EZFooter';
import EZAsideNavigation from './EZAsideNavigation';
import style from '../styles/scss/EZLayout.module.scss';
import Head from 'next/head';

export default function EZLayout({ children, useHeaderFooter, bgWhite, useNavigator, pageTitle }) {
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
