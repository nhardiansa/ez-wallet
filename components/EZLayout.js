import EZNavbar from './EZNavbar';
import EZFooter from './EZFooter';
import style from '../styles/scss/EZLayout.module.scss';

export default function EZLayout({ children, useHeaderFooter, bgWhite }) {
  return (
    <>
      <EZNavbar bgWhite={bgWhite} />
        <div className={`${style['container-layout']} container`}>
          {children}
        </div>
      <EZFooter useHeader={useHeaderFooter} />
    </>
  )
}
