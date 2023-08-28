import React, { useState, useEffect, useRef } from 'react'
import { set_Username, UpdateSavedProjects, UpdateFollowing, UpdateFollowers } from '../../Actions/Actions';
import { useFunction } from '../../Common_function_context/ContextProvide';
import { Button as TailwindButton } from "@material-tailwind/react";
import { Avatar, Typography } from "@material-tailwind/react";
import User_profile_skeleton from './User_profile_skeleton';
import { Tooltip, Button } from "@material-tailwind/react";
import { CiBookmarkPlus } from "react-icons/ci";

import { useSelector, useDispatch } from 'react-redux';
import { GoMail } from "react-icons/go";
import './css/User_project_template.css'
// import './User_profile.css'
import axios from 'axios'
import { HiMail, HiMailOpen } from "react-icons/hi";
import { BsFillBookmarkPlusFill, BsFillChatLeftTextFill, BsThreeDots } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import Report_modal from './Report_modal';


function User_project_template({ Image, Name, Uid, _id, Description ,timestamp}) {
    const ref = useRef();
    const [saved, setSaved] = useState(0);
    const navigate = useNavigate();
    const Dispatch = useDispatch();
    const [ishide, sethide] = useState(true);
    const [othersection, setothersection] = useState(false);
    const { changeToTime, set_err, setOpen, setProjectcounter } = useFunction()
    const userstate = useSelector(state => state.UserReducer)
    // useEffect(() => {

    //     // const checkIfClickedOutside = e => {
    //     //   if (!ishide && ref.current && !ref.current.contains(e.target)) {
    //     //     sethide(true);
    //     //   }
    //     // }
    //     // document.addEventListener("mousedown", checkIfClickedOutside)
    //     // return () => {
    //     //   document.removeEventListener("mousedown", checkIfClickedOutside)

    //     // }
    //   }, [ishide])
    const get_date = (timestamp) => {
        const dateObj = new Date(timestamp);

        const year = dateObj.getFullYear();
        const month = dateObj.toLocaleString('default', { month: 'long' });
        const day = dateObj.getDate();
        return day+' '+month;
    }
    const handlesave = async (value) => {
        if (userstate.accesstoken === "") {
            set_err("Your were Not logged in", 2)
            navigate('/login')
        }
        else if (userstate.Uid === Uid) {
            set_err("cant save Your own project", 2);
            return;
        }
        if (value === true) {
            try {
                setOpen(true);
                const result = await axios.post(`${process.env.REACT_APP_PROXY}/User/SaveProject`, { Uid: userstate.Uid, _id });
                setOpen(false);
                set_err(result.data.message, result.data.type);
                Dispatch(UpdateSavedProjects(result.data.newSavedProjects));
                setSaved(prev => value)
            } catch (err) {
                setOpen(false);
                set_err(err.response.data.message, err.response.data.type);

            }
        }
        else {
            try {
                setOpen(true);
                const result = await axios.post(`${process.env.REACT_APP_PROXY}/User/unSaveProject`, { Uid: userstate.Uid, _id });
                setOpen(false);
                set_err(result.data.message, result.data.type);
                Dispatch(UpdateSavedProjects(result.data.newSavedProjects));
                setSaved(prev => value)
            } catch (err) {
                setOpen(false);
                set_err(err.response.data.message, err.response.data.type);

            }
        }
        // setSaved(prev => value)
    }
    return (

        <div className="project-template-main">
            <div className="date-div">
                <p>{get_date(timestamp)}</p>
                <div className="saved-section">
                    {
                        !saved ? (<CiBookmarkPlus size={30} onClick={() => handlesave(true)} title="Save this Project" />) : (<BsFillBookmarkPlusFill size={25} onClick={() => handlesave(false)} title="Unsave this Project" />)
                    }
                    <div className='threedots-section'>

                        <BsThreeDots size={30} className="threedots" onClick={() => sethide(prev => !prev)} />
                        {
                            !ishide && (
                                <div className='threedot-main' ref={ref}>
                                    <div className="feedback">
                                        <div className="small-triangle"></div>
                                        <Report_modal _id={_id} Uid={Uid} />

                                    </div>
                                </div>)
                        }
                    </div>

                    {
                        othersection &&
                        <div>

                        </div>
                    }
                </div>

            </div>
            <div className="details-div-project">
                <a href={`/Project/${_id}/${Uid}`} className='project-link'>
                    <div className="project-content">
                        <b>
                            <p>{Name}</p>
                        </b>
                        <p>{Description}</p>
                    </div>
                    <div className="project-image">
                        <img src={Image} width="100%" />
                    </div>
                </a>
            </div>
            <div className="other-div">

            </div>
            <hr />
        </div>

    )
}

export default User_project_template