import React, { useState, useEffect } from 'react'
import './ProjectDisplay.css';
import { FaRupeeSign } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Button from '../Buttons/Button';
import { AiOutlineDislike, AiFillDislike, AiFillCheckCircle, AiFillLike, AiOutlineLike } from "react-icons/ai";
import SpeedDials from './SpeedDial';
import axios from 'axios';
import { Button as TailwindButton, Textarea } from "@material-tailwind/react";
import Comment from './Comment';
import { useFunction } from '../../Common_function_context/ContextProvide';


function ProjectDisplay({ _id, Name, Uid, Description, Contact, Deployed_link, Image, isFullStack, timestamp, comments }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(0);
  const [disliked, setDisliked] = useState(0);
  const [animate, setAnimate] = useState(null);
  const [showcomment, setComment] = useState(false);
  const userstate = useSelector(state => state.UserReducer)
  const [new_comment, setcomment] = useState("");
  const [alreadyCommented, setalreadycomment] = useState([...comments])
  const { set_err,setOpen } = useFunction();

  const changeToTime = (data) => {
    const date = new Date(data);
    // console.log(date .toDateString())
    return date.toDateString()
  }
  
  const clickFun = (e) => {
    console.log("jer");
    // console.log("click ho rha hai")
  }

  //! IF USER LIKE A PROJECT THEN CALLING TO INCREASE LIKE AND STORE ID IN BACKEND

  const increase_like = async () => {
    try {
      // console.log("called")
      await axios.post(`http://localhost:4000/Api/Projects/likecount/${_id}/${1}/${userstate.Uid}`);
    } catch (e) {
      console.log(e.response.data)
    }
  }
  //! IF USER DISLIKE A PROJECT THEN CALLING TO INCREASE DISLIKE AND STORE ID IN BACKEND
  const increase_dislike = async () => {
    try {
      const result = await axios.post(`http://localhost:4000/Api/Projects/likecount/${_id}/${0}/${userstate.Uid}`);

    } catch (e) {
      console.log(e.response.data)
    }
  }
  const handlecomment = async () => {
    try {
      setOpen(true); // Show the Backdrop component
  
      const result = await axios.post(`http://localhost:4000/Api/Projects/comment/${userstate.Uid}/${_id}`, { comment: new_comment });
      setalreadycomment([...result.data.new_comments]);
      setcomment("");
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setOpen(true); // Hide the Backdrop component regardless of success or failure
    }
  }
  const handlelike = () => {
    if (userstate.accesstoken === "") {
      set_err("Your were Not logged in", 2)
      navigate('/login')
    }
    increase_like();
    setAnimate(true)
    setLiked(1);
    setDisliked(0);
    setTimeout(() => setAnimate(false), 2000)
  }
  const handledisliked = () => {
    if (userstate.accesstoken === "") {
      set_err("Your were Not logged in", 2)
      navigate('/login')
    }

    setLiked(0)
    setDisliked(1)
    increase_dislike();
  }
  const handleshowcomment = () => {
    // console.log("clicked")
    setComment(prev => !prev);
  }
  //! handleSave to save a article
  // handleSave=async()=>{
  //   try{

  //   }

  // }
  useEffect(() => {
    const get_liked = async () => {
      try {
        const result = await axios.post('http://localhost:4000/Api/Projects/Already_liked', { user_uid: userstate.Uid, _id })
        // console.log(result.data.like, `${Name}`)

        setLiked(result.data.like);
      } catch (err) {
        console.log(err)
      }
    }
    const get_disliked = async () => {
      try {
        const result = await axios.post('http://localhost:4000/Api/Projects/Already_disliked', { user_uid: userstate.Uid, _id })
        // console.log(result.data.dislike, `${Name}`)
        setDisliked(result.data.dislike);
      } catch (err) {
        console.log(err)
      }
    }
    get_liked();
    get_disliked();
    
  }, []);
  // console.log(userstate.ProfileImage)
  return (
    <div className="display-outer" >
      <div className="display-main">
        <div className="display-left">

          <div className="img-section">
            <img src={Image} />
            {
              isFullStack && <div className='fullstack-btn'>
                <Button value="Fullstack" />
              </div>
            }
            <a href={Image}></a>
          </div>

          <div className="like-dislike-btn">
           
            {
              disliked == 0 ? (<AiOutlineDislike size={30} onClick={handledisliked} />)
                : (<AiFillDislike size={30} />)
            }
          </div>
        </div>
        <div className="display-right">
          <div className="display-details">
            <div className="detail-section">
              <div className="name-verfied">
                <a href="https://www.youtube.com/" className="name-value" target='_blank'>
                  <span >
                    Username
                  </span>
                </a>
                <span className="verfied-icon">
                  <AiFillCheckCircle size={20} style={{ color: "cyan" }} />
                  <p>Verfied</p>
                </span>
              </div>
              <div className="display-details-main">
                <div className='display-details'>
                  <table className="display-table">
                    <tr>
                      <th>Title</th>
                      <th>Industry</th>
                      <th>Monetized</th>
                      <th>Site Age</th>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>Industry</td>
                      <td>Monetized</td>
                      <td>Site Age</td>
                    </tr>
                  </table>
                  <div className="display-description">
                    <span>
                      <span style={{ color: "purple", fontWeight: "600" }}>
                        {Description.split(' ')[0]}
                      </span>
                      {Description.split(' ').slice(1).join(' ')}
                    </span>
                  </div>

                </div>
              </div>
            </div>

            <div className="display-price">
              <div>
                <small>
                  Asking Price
                </small>
                <div className="price">
                  <FaRupeeSign />
                  <span>
                    15000
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="display-btns hidden-btn">
            <div className="comment-section">
              <Button value="Comment" func={handleshowcomment} />
              <Button value="Chat" func={clickFun} />
              <Button value="Watch" func={clickFun} />
            </div>
            <div className="other-details">
              <a href={`/Project/${_id}/${Uid}`}>
                <Button value="View Details" func={clickFun} />
              </a>
            </div>
          </div>
          <div className='speeddial'>
            {/* <BasicSpeedDial /> */}
            <SpeedDials />

          </div>
        </div>
      </div>
      <div className={showcomment ? "comment-div show-comment" : "comment-div"}>
        <div className={showcomment ? "comment-main" : "comment-hide"}>
          <div className={userstate.accesstoken !== "" ? "comment-user" : "hide-user"}>
            <div className="user-detail">
              {/* <div className="img-div"> */}
              <a href={userstate.ProfileImage}>link</a>
              <img src={userstate.ProfileImage} alt="Profile image" className='img-div' />
              {/* </div> */}
              <span className="user-name">{userstate.Username}</span>
            </div>
            <div className="comment-input">
              <textarea name="comment" rows="4" value={new_comment} onChange={(e) => setcomment(e.target.value)} placeholder='Whats your Thoughts' />
            </div>
            <div className="user-btn">
              <TailwindButton style={{ backgroundColor: "gray" }} >Cancel</TailwindButton>
              <TailwindButton onClick={handlecomment}>Respond</TailwindButton>
            </div>
          </div>
          <div className={showcomment ? "comment-display" : "comment-hide-section"}>
            <center>
              <h4>Comments</h4>
            </center>
            {
              alreadyCommented.map((ele, index) =>
              (
                <Comment {...ele} key={index} />
              )
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDisplay
      //