import Image from 'next/image'
import { useEffect, useState } from 'react';
import imagePlaceholder from '../public/images/testi-placeholder.jpg'

export default function EZHistoryItem({ amount, transactionType}) {
  
  const [income, setIncome] = useState(false);

  useEffect(() => {
    if (transactionType === 'Top-up') {
      setIncome(true);
    }
  }, [])

  return (
    <div className="history-item position-relative mb-3">
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <div className="image-wrapper d-flex align-items-center">
            <Image src={imagePlaceholder} width={56} height={56}  className="rounded d-block" />
          </div>
          <div className='d-flex flex-column ms-3 justify-content-center'>
            <p className='mb-0 fw-bold'>Other user name</p>
            <p className='mb-0 text-gray fs-sm'>Accepted</p>
            <p className={`${income ? 'text-primary' : 'text-danger' } d-md-none mb-0 fw-bold`}>
              {income ? '+' : '-'} {Number(amount).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
        <div className="wrapper-desktop-amount d-none d-md-flex align-items-center ">
          <p className={`m-0 align-middle fw-bold ${income ? 'text-primary' : 'text-danger' }`}>
          {income ? '+' : '-'} {Number(amount).toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </div>
  )
}
