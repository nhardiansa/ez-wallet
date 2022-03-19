import {FiTrash} from 'react-icons/fi'
import EZLayout from '../../components/EZLayout'
import EZInput from '../../components/EZInput'
import { parsePhoneNumber } from 'libphonenumber-js'
import {BsTelephone} from 'react-icons/bs'

import style from '../../styles/scss/PersonalInformation.module.scss'
import { useState } from 'react'
import EZButton from '../../components/EZButton'

export default function ManagePhone() {

  const [addPhoneNumber, setAddPhoneNumber] = useState(false)

  const deleteHandler = (e) => {
    const id = e.target.id
    alert('Delete phone number' + id)
  }

  return (
    <>
      <EZLayout bgWhite={true} useHeaderFooter={true} useNavigator={true}>
        <div className="manage-phone rounded shadow h-100 p-3 mb-3 mb-lg-0">
          <h1 className='fw-bold fs-5 text-capitalize'>
              {
                addPhoneNumber ? (
                  'Add Phone Number'
                  ) : (
                  'Manage phone number'
                )
              }
            </h1>
          <p className={`${style.desc} text-gray mt-4`}>
            {
              addPhoneNumber ? (
                  'Add at least one phone number for the transfer ID so you can start transfering your money to another user.'
                ) : (
                  'You can only delete the phone number and then you must add another phone number.'
              )
            }
          </p>

          {
            !addPhoneNumber && (
              <div className="phone-numbers mt-5">
                <div className="info-item rounded shadow p-3  d-flex align-items-md-center justify-content-between">
                  <div className="wrapper-phone-number">
                    <p className='text-gray mb-1'>Phone number</p>
                    <p className='m-0 fs-5 fw-bold text-black'>{parsePhoneNumber('081290945780', 'ID').formatInternational()}</p>
                  </div>
                  <div onClick={deleteHandler} id='1' className="delete-icon me-md-3 pe-auto" style={{cursor: 'pointer'}}>
                    <FiTrash id='1' className='fs-3 text-danger pe-auto' style={{cursor: 'pointer'}} />
                  </div>
                </div>
              </div>
            )
          }
          {addPhoneNumber && (
            <div className="add-phone-number">
              <div className="input-phone-number mt-5 d-flex justify-content-center">
                <form className={`${style['form-add-phone']} d-flex flex-column`}>
                  <EZInput
                    icon={<span>
                      <BsTelephone className='fs-5' /> <span className='fs-6 ms-md-3'>+62</span>
                    </span>}
                    type='number'
                    placeholder='Enter your phone number'
                    inputClassName='pb-1 pb-md-0 ps-0'
                  />
                  <EZButton className='mt-5 py-3'>Add phone number</EZButton>
                </form>
              </div>
            </div>
          )}
        </div>
      </EZLayout>
    </>
  )
}
