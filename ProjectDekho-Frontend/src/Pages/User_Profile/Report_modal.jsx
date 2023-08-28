import axios from 'axios'
import React, { useState ,useRef  } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { Button as TailwindButton } from "@material-tailwind/react";
import { useFunction } from '../../Common_function_context/ContextProvide';

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch()
  const { set_err, setOpen } = useFunction();
  const userstate = useSelector(state => state.UserReducer)
  const [report_reason, setreport] = useState("");
  const { } = useFunction()
  // const 
  const changereport = (e) => {
    setreport(e.target.value);
  }
  const handleReport = async () => {
    const obj = {
      report_reason,// report reason chaie
      user_logged_uid: userstate.Uid, // logged user uid chaie 
      project_id: props._id,// or project ki _id bhi chaie
      project_user_uid: props.Uid // project uploader uid
    }
    try {
      setOpen(true)
      const result = await axios.post(`${process.env.REACT_APP_PROXY}/Projects/ReportProject`, obj);
      setOpen(false);
      set_err(result.data.message, result.data.type);
      props.onHide()
    } catch (e) {
      console.log("report api ki error", e.message);
      setOpen(false);
      props.onHide()
      set_err("internal server error", 3);
    }
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ backgroundColor: 'white !important' }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Report Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <ul>
          <li><input type="radio" id="spam" name="report_reason" defaultChecked onChange={e => changereport(e)} value="spam" /><label for="spam" style={{ paddingLeft: "10px", color: "black" }}>Spam</label></li>
          <li> <input type="radio" id="harassment" name="report_reason" onChange={e => changereport(e)} value="harassment" /><label for="harassment" style={{ paddingLeft: "10px", color: "black" }}>Harassment</label></li>
          <li><input type="radio" id="rule" name="report_reason" onChange={e => changereport(e)} value="Rule Violation" /><label for="rule" style={{ paddingLeft: "10px", color: "black" }}>Rule Violation</label></li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <TailwindButton onClick={props.onHide}>Close</TailwindButton>
        <TailwindButton onClick={() => handleReport()}>Report</TailwindButton>
      </Modal.Footer>
    </Modal>
  );
}

function Report_modal({ Uid, _id }) {
  const [modalShow, setModalShow] = React.useState(false);


  return (
    <>
      <p variant="primary" onClick={() => setModalShow(true)}
        style={{ cursor: "pointer" }}>
        Report This Project
      </p>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        _id={_id}
        Uid={Uid}
      />
    </>
  )
}

export default Report_modal