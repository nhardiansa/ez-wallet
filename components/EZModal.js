import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import EZButton from './EZButton'

export default function EZModal({modalTitle, modalBody, onConfirm, onHide, loading, ...rest}) {
  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='border-bottom-0' closeButton={true} onHide={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          <p className='fs-5 fw-bold'>
            {modalTitle}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalBody}
      </Modal.Body>
      <Modal.Footer className='border-top-0'>
        <EZButton className='px-lg-5 py-lg-3' onClick={onConfirm}>
          {
            loading ? (
              <>
                <span className='spinner-border spinner-border-sm mr-2' role='status' aria-hidden='true'></span>
              </>
            ) : (
              'Confirm'
            )
          }
        </EZButton>
      </Modal.Footer>
    </Modal>
  )
}
