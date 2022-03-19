import Image from 'next/image'
import imagePlaceholder from '../public/images/testi-placeholder.jpg'

export default function EZHistoryItem() {
  return (
    <div className="history-item position-relative mb-3">
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <div className="image-wrapper d-flex align-items-center">
            <Image src={imagePlaceholder} width={56} height={56}  className="rounded d-block" />
          </div>
          <div className='d-flex flex-column ms-3 justify-content-center'>
            <p className='mb-0 fw-bold'>Name</p>
            <p className='mb-0 text-gray fs-sm'>Transaction status</p>
            <p className='d-md-none mb-0 justify-self-end'>Transaction amount</p>
          </div>
        </div>
        <div className="wrapper-desktop-amount d-none d-md-flex align-items-center ">
          <p className='m-0 align-middle fw-bold'>Transaction amount</p>
        </div>
      </div>
    </div>
  )
}
