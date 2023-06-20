import react, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IoEllipseSharp } from 'react-icons/io5';
import { useFunction } from '../../Common_function_context/ContextProvide';
import { LoadingButton } from '@mui/lab';

const Transition = react.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function VerficationModal({setModalOpen,Modalopen,user_gmail,setverfied}) {
    // const { user_gmail } = useParams()
    const navigate = useNavigate();
    const { set_err, setOpen } = useFunction();
    // const [Modalopen, setModalOpen] = useState(true);
    const [otp, setotp] = useState(0);
    const [issend, setsend] = useState(false);
    const [loadingbtn, setloadingbtn] = useState(false);
    const [disableresend, setdisableresend] = useState(false);
    const [counter, setcounter] = useState(0);

    const handleSubmit = async () => {
        try {
            setloadingbtn(true);
            const result = await axios.post(`${process.env.REACT_APP_PROXY}/User/Verify`, { otp })
            if (result.data.issuccessfull) {
                set_err(result.data.message, result.data.type)
                setverfied(false)
                setModalOpen(false);
            }
            setloadingbtn(false);
        } catch (err) {
            set_err(err.response.data.message, err.response.data.type)
            setloadingbtn(false);
            setsend(false)
            setotp(0)
            console.log("verfiy kerte time error", err.response.data.message)
        }
    }
    const handlesend = async () => {
        try {
            setloadingbtn(true);
            setcounter(prev => prev + 1)
            setsend(false);
            const result = await axios.post(`${process.env.REACT_APP_PROXY}/User/SendOTP`, { user_gmail })
            setsend(result.data.issuccessfull)
            setloadingbtn(false);
            setdisableresend(true)
            setTimeout(() => {
                setdisableresend(false)
            }, 60000);
        } catch (err) {
            setsend(false)
            setloadingbtn(false);
            set_err("Interal Server Errro please try again ", 2)
            console.log("verfiy kerte time error", err.response.data.message)
        }
    }
    return (
        <div>
            <Dialog
                open={Modalopen}
                TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Email verfication"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Enter OTP SENT TO YOU REGISTERED gmail For gmail verfication
                    </DialogContentText>
                    <center>
                        <input
                            id="outlined-number"
                            label="Number"
                            type="number"
                            value={otp}
                            onChange={(e) => setotp(e.target.value)}
                        />
                    </center>
                    {issend && <center><small style={{ color: "grey" }}>OTP sent succesfully </small></center>}
                    {disableresend &&<center><small style={{ color: "grey" }}><span style={{ color: "red" }}>*</span>please wait for 60 seconds before requesting a resend.</small></center>}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        size="small"
                        onClick={handlesend}
                        loading={loadingbtn}
                        disabled={disableresend}
                        loadingPosition="end"
                        variant="outlined">
                        <span>{counter <= 1 ? "Send" : "Resend"} otp</span>
                    </LoadingButton>
                    <LoadingButton
                        size="small"
                        onClick={handleSubmit}
                        loading={loadingbtn}
                        // loadingIndicator="Loading…"
                        loadingPosition="end"
                        variant="outlined">
                        <span>Submit</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}