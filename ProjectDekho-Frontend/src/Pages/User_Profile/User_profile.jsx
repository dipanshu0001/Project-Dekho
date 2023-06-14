import React, { useState, useEffect } from 'react'
import { Avatar, Typography } from "@material-tailwind/react";
import axios from 'axios'
import './User_profile.css'
import { Button as TailwindButton } from "@material-tailwind/react";
import { GoMail } from "react-icons/go";
import { Tooltip, Button } from "@material-tailwind/react";
import User_profile_skeleton from './User_profile_skeleton';

function User_profile({ uid,onFollow,onUnFollow,isFollowing }) {
    const [userdata, setuserdata] = useState({
        Followers: [],
        Following: [],
    })
    const [isloading, setloading] = useState(false)
    // console.log(is)
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
                                <Tooltip content={`Follow ${userdata.Username}`}>
                                    <TailwindButton onClick={!isFollowing?onFollow:onUnFollow}>{isFollowing?"Following":"Follow"}</TailwindButton>
                                </Tooltip>
                                <Tooltip content={`You will get mail as soon as ${userdata.Username} upload a new project`}>
                                    <TailwindButton
                                    ><GoMail size={20} /></TailwindButton>
                                </Tooltip>
                            </div>
                            <div className="user-following">
                                <center><b>Following</b></center>
                                {
                                    userdata.Following && userdata.Following.map((ele, index) =>
                                    (
                                        <div className="flex flex-col gap-6" key={ele.User_id}>
                                            <div className="flex items-center gap-4 my-10">
                                                {/* <Avatar alt="avatar" /> */}
                                                <Avatar src={ele.ProfileImage} alt="avatar" size="s" variant="rounded" />
                                                <div>
                                                    <a href={`/Profile/${ele.User_id}`} style={{textDecoration:"none", color:'black'}}>
                                                    <Typography variant="h6">{ele.Username}</Typography>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                ) : (<User_profile_skeleton/>)
            }
        </>
    )
}

export default User_profile