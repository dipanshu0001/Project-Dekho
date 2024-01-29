import axios from 'axios'
import './css/User_profile_hoc.css'
import User_profile from './User_profile';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { Avatar, Typography } from "@material-tailwind/react";
import { useFunction } from '../../Common_function_context/ContextProvide';
import { set_Username, UpdateSavedProjects, UpdateFollowing, UpdateFollowers } from '../../Actions/Actions';

function Follower() {

    const { uid } = useParams();
    const { changeToTime, set_err, setOpen, setProjectcounter } = useFunction()
    const userstate = useSelector(state => state.UserReducer)
    const navigate = useNavigate();
    const Dispatch = useDispatch();
    const [activeroute, setactiveroute] = useState(0);
    const [isFollowing, setfollowing] = useState(false);
    const [user_detail, setdetail] = useState({
        Following: [],
        Followers: [],
    });
    //! UF USER WANT TO FOLLOW THE PROJECT UPLOAD USER 
    useEffect(() => {
        const get_data = async () => {
            try {
                const result = await axios.post(`${process.env.REACT_APP_PROXY}/User/Get_User`, { uid });
                console.log(result.data)
                setdetail(prev => ({ ...prev, ...result.data.user }));
            } catch (err) {
                console.log(err);
            }
        }
        get_data();
    }, [])
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
            const name=userstate.Username.split(' ').join(',');
            console.log(name);
            const result = await axios.post(`http://localhost:4000/Api/User/Followers/${userstate.Uid}/${0}/${uid}/false/${userstate.Gmail}/${name}`)
            // console.log(result.data)
            // ${process.env.REACT_APP_PROXY}
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
            const result = await axios.post(`${process.env.REACT_APP_PROXY}/User/Followers/${userstate.Uid}/${1}/${uid}/false/${userstate.Gmail}/${userstate.ProfileImage}/${userstate.Username}`)
            Dispatch(UpdateFollowing(result.data.new_list))
            setOpen(false);
            set_err(result.data.message, result.data.type);
            setfollowing(false)

        } catch (err) {
            // console.log(err);
            setOpen(false);
        }
    }

    const handlechanges = (value) => {
        if (value == "home") {
            navigate('home');
            setactiveroute(0);
        }
        else {
            navigate('about');
            setactiveroute(1);
        }
    }
    return (
        // <div>
        //     {
        //         user_detail.Following && user_detail.Following.map((ele, index) =>
        //         (
        //             <div className="flex flex-col gap-6" key={ele.User_id}>
        //                 <div className="flex items-center gap-4 my-10">
        //                     <Avatar src={ele.ProfileImage} alt="avatar" size="s" variant="rounded" />
        //                     <a style={{ textDecoration: "none", color: 'black' }}>
        //                         <Typography variant="h6">{ele.Username}</Typography>
        //                     </a>

        //                 </div>
        //             </div>
        //         ))
        //     }
        //     <div className="hoc-profile">

        //     <User_profile uid={uid} onFollow={handleFollow} onUnFollow={handleunFollow} isFollowing={isFollowing} setfollowing={setfollowing} />
        //     </div>
        // </div>
        <>
            <div className='profile-hoc-main'>
                <div className="hoc-project">
                    <h1>{user_detail.Followers && (user_detail.Followers.length)} Followers</h1>
                    {
                        user_detail.Followers && user_detail.Followers.map((ele, index) =>
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
                <div className="hoc-profile">
                    <User_profile uid={uid} onFollow={handleFollow} onUnFollow={handleunFollow} isFollowing={isFollowing} setfollowing={setfollowing} />
                </div>
            </div>
        </>
    )
}
export default Follower