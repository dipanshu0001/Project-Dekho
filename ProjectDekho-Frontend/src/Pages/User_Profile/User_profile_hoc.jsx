import User_profile from './User_profile'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate ,Outlet} from 'react-router-dom'
import { Avatar, Typography } from "@material-tailwind/react";
import { useFunction } from '../../Common_function_context/ContextProvide';
import { AiOutlineDislike, AiFillDislike, AiFillCheckCircle, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsFillBookmarkPlusFill, BsFillChatLeftTextFill, BsBuildingCheck } from "react-icons/bs";
import { CiBookmarkPlus } from "react-icons/ci";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { set_Username, UpdateSavedProjects, UpdateFollowing, UpdateFollowers } from '../../Actions/Actions';
import { SlUserFollowing, SlUserFollow } from "react-icons/sl";
import axios from 'axios'
import styled from 'styled-components'
import { useSocket } from '../../Common_function_context/SocketProvider';
import { MdOutlineMonetizationOn, } from "react-icons/md";
import { FaIndustry } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import User_project_template from './User_project_template';
import './css/User_profile_hoc.css'
import User_projects from './User_projects';

function User_profile_hoc() {
    const { uid } = useParams();
    const { changeToTime, set_err, setOpen, setProjectcounter } = useFunction()
    const userstate = useSelector(state => state.UserReducer)
    const navigate = useNavigate();
    const Dispatch = useDispatch();
    const [activeroute,setactiveroute]=useState(0);
    const [isFollowing, setfollowing] = useState(false);
    const [user_detail,setdetail] =useState("");

    //! UF USER WANT TO FOLLOW THE PROJECT UPLOAD USER 
    useEffect(()=>{
        const get_data=async()=>{
            try{
                const result=await axios.post(`${process.env.REACT_APP_PROXY}/User/Get_User`,{uid});
                console.log(result.data)
                setdetail(result.data.user.Username);
            }catch(err){
                console.log(err);
            }
        }
        get_data();
    },[])
    const handleFollow = async () => {
        if (userstate.accesstoken === "") {
            set_err("Your were Not logged in", 2)
            navigate('/login')
        }
        // console.log("followed was called")
        if (userstate.Uid === uid) {
            set_err("You can not Follow yourself ", 2);
            return
        }
        try {
            setOpen(true)
            const result = await axios.post(`${process.env.REACT_APP_PROXY}/User/Followers/${userstate.Uid}/${0}/${uid}/false/${userstate.Gmail}`)
            // console.log(result.data)
            Dispatch(UpdateFollowing(result.data.new_list))
            setOpen(false);
            set_err(result.data.message, result.data.type);
            setfollowing(true)
        } catch (err) {
            // console.log(err);
            setOpen(false);
        }
    }
    //! UF USER WANT TO UNFOLLOW THE PROJECT UPLOAD USER WITH EDGE CASE COVERED
    const handleunFollow = async () => {
        if (userstate.Uid === uid) return
        try {
            setOpen(true)
            const result = await axios.post(`${process.env.REACT_APP_PROXY}/User/Followers/${userstate.Uid}/${1}/${uid}/false/${userstate.Gmail}`)
            Dispatch(UpdateFollowing(result.data.new_list))
            setOpen(false);
            set_err(result.data.message, result.data.type);
            setfollowing(false)

        } catch (err) {
            // console.log(err);
            setOpen(false);
        }
    }

    const handlechanges =  (value) => {
        if(value=="home"){
            navigate('home');
            setactiveroute(0);
        }
        else{
            navigate('about');
            setactiveroute(1);
        }
    }
    return (
        <>
            <div className='profile-hoc-main'>
                <div className="hoc-project">
                <h1>{user_detail&&user_detail}</h1> 
                    <div className="more_detail_div">
                        <ul>
                            <li className={activeroute===0?"active":""} onClick={()=>handlechanges("home")}>Home</li>
                            <li  className={activeroute===1?"active":""} onClick={()=>handlechanges("about")}>About</li>
                        </ul>
                    </div>
                    <Outlet />
                </div>
                <div className="hoc-profile">
                    <User_profile uid={uid} onFollow={handleFollow} onUnFollow={handleunFollow} isFollowing={isFollowing} setfollowing={setfollowing} />
                </div>
            </div>
        </>
    )
}

export default User_profile_hoc