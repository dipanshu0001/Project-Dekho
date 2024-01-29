import React, { useState, useEffect } from 'react'
import { Avatar, Typography } from "@material-tailwind/react";
import { Button as TailwindButton } from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { date } from 'yup';

function SingleUserFollow({ ProfileImage, User_id, Username, handleFollow, handleunFollow }) {
    const [isFollowing, setfollowing] = useState(false);
    const userstate = useSelector(state => state.UserReducer)
    useEffect(() => {
        const following = userstate.Following.find((ele) => ele.User_id === User_id);
        if (following !== undefined) {
            setfollowing(true);
        }
    }, [])
    return (
        <>
            <Avatar src={ProfileImage} alt="avatar" size="s" variant="rounded" />
            <a style={{ textDecoration: "none", color: 'black' }}>
                <Typography variant="h6">{Username}</Typography>
            </a>
            <TailwindButton onClick={() => !isFollowing ? handleFollow(User_id, setfollowing) : handleunFollow(User_id, setfollowing)}>{!isFollowing ? "Follow" : "Following"}</TailwindButton>
        </>
    )
}

export default SingleUserFollow