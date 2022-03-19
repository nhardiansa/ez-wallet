import { Dropdown } from 'react-bootstrap';
import Head from 'next/head'
import { useEffect } from 'react'
import { DropdownButton, } from 'react-bootstrap'
import EZAsideNavigation from '../components/EZAsideNavigation'
import EZLayout from '../components/EZLayout'
import Image from 'next/dist/client/image';

import style from '../styles/scss/EZHistory.module.scss'
import EZHistoryItem from '../components/EZHistoryItem';

export default function History() {

  useEffect(() => {
    console.log(document);
  }, [])

  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <EZLayout bgWhite={true}>
        <div className="row h-100">
          <div className="col-lg-3 d-none d-lg-block">
            <EZAsideNavigation />
          </div>
          <div className="col">
            <div className="history-head d-md-flex justify-content-between">
              <h1 className="fs-5 text-center fw-bold my-3">Transaction History</h1>
              <DropdownButton
                variant="secondary"
                title="Select Filter"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Separated link</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className={`${style['history-wrapper']} history-list mt-3`}>
              {
                [...Array(100)].map((item, index) => {
                  return (
                    <EZHistoryItem key={index} />
                  )
                })
              }
            </div>
          </div>
        </div>
      </EZLayout>
    </>
  )
}
