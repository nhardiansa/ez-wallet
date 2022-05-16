import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EZHistoryItem from "../../components/EZHistoryItem";
import EZLayout from "../../components/EZLayout";
import { useRouter } from "next/router";
import EZButton from "../../components/EZButton";
import { BsDownload } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";
import { getHistories } from "../../redux/actions/historyAction";

export default function Result() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { userReducer, transactionReducer } = useSelector((state) => state);
  const { recepientDetail, currentBalance } = userReducer;
  const { transferAmount, dateTime, notes, error, success, loading } =
    transactionReducer;

  useEffect(() => {
    return () => {
      dispatch(getHistories());
    };
  }, []);

  return (
    <>
      <EZLayout
        bgWhite={true}
        pageTitle={`Transfer`}
        useHeaderFooter={true}
        useNavigator={true}
      >
        <div className="send-money-wrapper rounded shadow p-3 h-100 overflow-auto">
          <div className="header mt-4 text-center">
            <span>
              {loading && <BiMailSend className="text-gray fs-bigger" />}
              {
                <>
                  {!loading && (
                    <>
                      {error ? (
                        <MdCancel className="text-danger fs-bigger" />
                      ) : (
                        <FiCheckCircle className="fs-bigger text-success" />
                      )}
                    </>
                  )}
                </>
              }
            </span>
            <p className="fs-5 fw-bold mt-3">
              {error ? error : success}
              {loading && "Sending..."}
            </p>
          </div>
          <div className="confirm-section mt-4 mt-md-5">
            <div className="info-item rounded shadow p-3 mb-3">
              <p className="text-gray mb-1">Amount</p>
              <p className="m-0 fs-5 fw-bold text-black">
                Rp {Number(transferAmount).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="info-item rounded shadow p-3 mb-3">
              <p className="text-gray mb-1">Balance Left</p>
              <p className="m-0 fs-5 fw-bold text-black">
                Rp {Number(currentBalance).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="info-item rounded shadow p-3 mb-3">
              <p className="text-gray mb-1">Date & Time</p>
              <p className="m-0 fs-5 fw-bold text-black">{dateTime}</p>
            </div>

            <div className="info-item rounded shadow p-3 mb-3">
              <p className="text-gray mb-1">Notes</p>
              <p className="m-0 fs-5 fw-bold text-black">
                {notes ? notes : "-"}
              </p>
            </div>
          </div>
          <EZHistoryItem
            wrapperClassname="rounded shadow p-4"
            userName={recepientDetail.fullName}
            accepted={
              recepientDetail.phone?.length
                ? recepientDetail.phone[0].number
                : "No phone number"
            }
            userImage={recepientDetail.picture}
          />
          <div className="btn-wrapper d-flex flex-column flex-md-row justify-content-end mt-4">
            <EZButton
              variant="white"
              className="py-md-3 px-md-5 mb-3 mb-md-0 me-md-3"
            >
              <span className="me-3">
                <BsDownload />
              </span>
              Download PDF
            </EZButton>
            <EZButton className="py-md-3 px-md-5">Back to Home</EZButton>
          </div>
        </div>
      </EZLayout>
    </>
  );
}
