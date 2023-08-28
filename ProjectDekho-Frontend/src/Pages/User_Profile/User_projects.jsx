import React, { useState, useEffect } from 'react'
import { set_Username, UpdateSavedProjects, UpdateFollowing, UpdateFollowers } from '../../Actions/Actions';
import { useFunction } from '../../Common_function_context/ContextProvide';
import { Button as TailwindButton } from "@material-tailwind/react";
import { Avatar, Typography } from "@material-tailwind/react";
import User_profile_skeleton from './User_profile_skeleton';
import { Tooltip, Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoMail } from "react-icons/go";

import './css/User_projects.css'
import axios from 'axios'
import { HiMail, HiMailOpen } from "react-icons/hi";
import User_project_template from './User_project_template';

function User_projects() {
  const{uid}=useParams();
  const [AllProjects, setAllProjects] = useState([]);
  useEffect(() => {
    const getAllProjects = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_PROXY}/Projects/Get_ParticularProject_User/${uid}`
      );
      console.log(response.data.result)
      setAllProjects(response.data.result);
    };
    getAllProjects();
  }, [])
  return (
    <div>
      {
        AllProjects.length && AllProjects.map((ele, index) =>
        (
          <User_project_template {...ele} key={index}/>
        ))
      }
    </div>
  )
}

export default User_projects