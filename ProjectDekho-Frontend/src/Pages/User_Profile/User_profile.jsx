import React, { useState, useEffect } from 'react'
import { set_Username, UpdateSavedProjects, UpdateFollowing, UpdateFollowers } from '../../Actions/Actions';
import { useFunction } from '../../Common_function_context/ContextProvide';
import { useNavigate } from 'react-router-dom'

import { Button as TailwindButton } from "@material-tailwind/react";
import { Avatar, Typography } from "@material-tailwind/react";
import User_profile_skeleton from './User_profile_skeleton';
import { Tooltip, Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from 'react-redux';
import { GoMail } from "react-icons/go";
import './css/User_profile.css'
import axios from 'axios'
import { HiMail, HiMailOpen } from "react-icons/hi";

function User_profile({ uid, onFollow, onUnFollow, isFollowing, setfollowing }) {
    const Dispatch = useDispatch();
    const navigate = useNavigate();
    const userstate = useSelector(state => state.UserReducer)
    const { set_err, setOpen } = useFunction();
    const [issubscribe, setissubscribe] = useState(false)
    const [isloading, setloading] = useState(false)
    const [userdata, setuserdata] = useState({
        Followers: [],
        Following: [],
    })

    // ! handleSubscribe 
    const handleSubscribe = async () => {
        if (userstate.accesstoken === "") {
            set_err("Your were Not logged in", 2)
            navigate('/login')
        }
        else if (userstate.Uid === uid) {
            set_err("cant subscribe Yourself", 2);
            return;
        }
        try {
            setOpen(true);
            const url = `${process.env.REACT_APP_PROXY}/User/Followers/${userstate.Uid}/${2}/${uid}/true/${userstate.Gmail}`
            const result = await axios.post(url);
            Dispatch(UpdateFollowing(result.data.new_list))
            setfollowing(true);
            setissubscribe(true);
            setOpen(false);

        } catch (err) {
            console.log(err.response.data.message);
        }
    }
    //! handleUnSubscribe
    const handleUnSubscribe = async () => {
        if (userstate.accesstoken === "") {
            set_err("Your were Not logged in", 2)
            navigate('/login')
        }
        else if (userstate.Uid === uid) {
            set_err("cant subscribe Yourself", 2);
            return;
        }
        try {
            setOpen(true);
            const url = `${process.env.REACT_APP_PROXY}/User/Followers/${userstate.Uid}/${3}/${uid}/false/${userstate.Gmail}`
            const result = await axios.post(url);
            // console.log(result.data.new_list)
            Dispatch(UpdateFollowing(result.data.new_list))
            setfollowing(false);
            setissubscribe(false);
            setOpen(false);

        } catch (err) {
            console.log(err.response.data.message);
        }
    }
    useEffect(() => {
        const get_data = async () => {
            try {
                setloading(true)
                const url = `${process.env.REACT_APP_PROXY}/User/GET_USER`
                // console.log(url)
                const result = await axios.post(url, { uid })
                // console.log(result.data.user)
                setuserdata(prev => ({ ...prev, ...result.data.user }))
                setloading(false)
            } catch (err) {
                console.log(err.response.data.message)
                setloading(true)
            }
        }
        get_data();
    }, [isFollowing])
    return (
        <>
            {
                !isloading ? (
                    <div className="user-outer">
                        <div className="user-main">
                            <div className="user-details">

                                <Avatar src={userdata.ProfileImage} alt={`${userdata.username} profile Image`} size="xxl" style={{ borderRadius: "50%" }} className='user-image' />
                                <div className='detail-info'>
                                    <Typography><b>{userdata.Username}</b></Typography>
                                    <b style={{ color: 'grey' }}>
                                        {userdata.Followers && userdata.Followers.length} Followers
                                    </b>
                                </div>
                                <div className='user-info'>
                                    <p>{userdata.Userintro && userdata.Userintro.replace("$NAME$", `${userdata.Username}`).split('. ').slice(0, 2).join('.  ')}</p>
                                </div>
                            </div>
                            <div className="user-buttons">
                                <Tooltip content={!isFollowing ? `Follow ${userdata.Username}` : `Following ${userdata.Username}`}>
                                    <TailwindButton onClick={!isFollowing ? onFollow : onUnFollow}>{isFollowing ? "Following" : "Follow"}</TailwindButton>
                                </Tooltip>
                                <Tooltip
                                    content={!issubscribe ? `You will get mail as soon as ${userdata.Username} upload a new project` : `You are subscribed to ${userdata.Username}`}>
                                    <TailwindButton onClick={!issubscribe ? handleSubscribe : handleUnSubscribe}>
                                        {!issubscribe ? <HiMailOpen size={30} /> : <HiMail size={30} />}
                                    </TailwindButton>
                                </Tooltip>
                            </div>
                            <div className="user-following">
                                <center><b>Following</b></center>
                                {
                                    userdata.Following && userdata.Following.map((ele, index) =>
                                    (
                                        <div className="flex flex-col gap-6" key={ele.User_id}>
                                            <div className="flex items-center gap-4 my-10">
                                                <Avatar src={ele.ProfileImage} alt="avatar" size="s" variant="rounded" />
                                                <a style={{ textDecoration: "none", color: 'black' }}>
                                                    <Typography variant="h6">{ele.Username}</Typography>
                                                </a>

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                ) : (<User_profile_skeleton />)
            }
        </>
    )
}

export default User_profile