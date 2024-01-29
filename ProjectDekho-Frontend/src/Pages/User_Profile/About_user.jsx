import React, { useState, useEffect } from 'react'
import { useParams,Outlet } from 'react-router-dom'
import axios from 'axios'
import User_profile from './User_profile';
import User_profile_hoc from './User_profile_hoc';
function About_user() {
  const { uid } = useParams();
  const [userdetail, setuserdetail] = useState({
    Followers: [],
    Following: []
  })
  useEffect(() => {
    const get_data = async () => {
      try {
        // setloading(true)
        const url = `${process.env.REACT_APP_PROXY}/User/GET_USER`
        const result = await axios.post(url, { uid })
        console.log(result.data.user)
        setuserdetail(prev => ({ ...prev, ...result.data.user }))
        // setloading(false)
      } catch (err) {
        console.error("about ke time error", err.response.data.message)
        // setloading(true)
      }
    }
    get_data();
  }, [])
  return (
    <div className="about-main">
      <a href={`/user_profile/${uid}/about/Followers`} target="_blank">{userdetail.Followers.length} Followers</a>
      <a href={`/user_profile/${uid}/about/Followings`} target="_blank">{userdetail.Following.length} Followings</a>
      <Outlet/>'
    </div>
  )
}

export default About_user