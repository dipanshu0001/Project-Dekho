import React, { useState, useEffect } from 'react'
import "./projectcard.css";
import { AiOutlineDislike, AiFillDislike, AiFillCheckCircle, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Button from '../Buttons/Button';
// import { AiOutlineDislike, AiFillDislike, AiFillCheckCircle, AiFillLike, AiOutlineLike } from "react-icons/ai";
// import SpeedDials from './SpeedDial';
import { GrFormView } from "react-icons/gr";
import axios from 'axios';
import { Button as TailwindButton, Textarea } from "@material-tailwind/react";
// import Comment from './Comment';
import { useFunction } from '../../Common_function_context/ContextProvide';
import Right_drawer from '../View_detail/Right_drawer';


const ProjectCard = ({ _id, Name, Uid, Description, Contact, Deployed_link, Image, isFullStack, timestamp, comments, likePeople, Viewcount, Vieweduser }) => {
  const navigate = useNavigate();
  const userstate = useSelector(state => state.UserReducer)
  const { set_err, setOpen ,setProjectcounter,Projectcounter} = useFunction();
  const [liked, setLiked] = useState(0);
  const [disliked, setDisliked] = useState(0);
  const [animate, setAnimate] = useState(null);
  const [showcomment, setComment] = useState(false);
  const [new_comment, setcomment] = useState("");
  const [alreadyCommented, setalreadycomment] = useState([...comments])
  const [likecount, setlikecount] = useState(likePeople.length);
  const [viewedcount, setviewedcount] = useState(Vieweduser.length);
  const [user_details, setDetails] = useState();

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
      // setlikecount(prev => prev + 1)
      const result = await axios.post(`http://localhost:4000/Api/Projects/likecount/${_id}/${1}/${userstate.Uid}`);
      console.log(result.data.count, "count of like")
      setlikecount(prev => result.data.count)
      setProjectcounter(prev => prev + 1);
    } catch (e) {
      console.log(e.response.data)
    }
  }
  //! IF USER DISLIKE A PROJECT THEN CALLING TO INCREASE DISLIKE AND STORE ID IN BACKEND
  const increase_dislike = async () => {
    try {
      // setlikecount(prev => prev - 1)
      const result = await axios.post(`http://localhost:4000/Api/Projects/likecount/${_id}/${0}/${userstate.Uid}`);
      console.log(result.data.count, "dislike")
      setlikecount(prev => result.data.count)
      setProjectcounter(prev => prev + 1)
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
    // console.log("CLicked")
    if (userstate.accesstoken === "") {
      set_err("Your were Not logged in", 2)
      navigate('/login')
    }
    increase_like();
    setAnimate(true)
    setLiked(1);
    setDisliked(0);
    setTimeout(() => setAnimate(false), 3000)
  }
  const handledisliked = () => {
    if (userstate.accesstoken === "") {
      set_err("Your were Not logged in", 2)
      navigate('/login')
    }
    increase_dislike();
    setDisliked(1)
    setLiked(0)
  }
  const handleshowcomment = () => {
    // console.log("clicked")
    setComment(prev => !prev);
  }
  const HandleviewDetail = async () => {
    if (userstate.accesstoken === "") {
      set_err("Your were Not logged in", 2)
      navigate('/login')
    }
    try {
      const update_count = await axios.post('http://localhost:4000/Api/Projects/Viewcount', { user_id: userstate.Uid, _id })
      // console.log(update_count.data)
      setviewedcount(update_count.data.new_list_length)
      navigate(`/Project/${_id}/${Uid}`)
      setProjectcounter(prev=>prev+1)
    } catch (err) {
      console.log(err.message)
    }
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
    const get_user = async () => {
      try {
        const result = await axios.post("http://localhost:4000/Api/User/Get_User", { uid: Uid });
        // console.log(result.data.user)
        setDetails(prev => ({ ...result.data.user }))
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
    get_user();
    get_liked();
    // get_disliked();
  }, [viewedcount,Projectcounter]);
  return (
    <div className="projectcard" >
      <article
        className="ContentGridItem-module_root-ej8Qs single-item single-pen"
        data-component="Item"
      >
        <div className="ContentGridItemBackground-module_root-qg7K1"></div>
        <div className="ItemPreview-module_root-4vt4W ContentGridItem-module_preview-BbV7S">
          <div className="ItemPreviewScreenshot-module_root-nlh2u">
            <div data-picture="true">
              <img
                src={Image}
                className="ItemPreviewImage-module_root-0gttw"
                alt="Project Image"
                loading="lazy"
              />
            </div>
            <a
              className="ItemPreviewCover-module_root-XiEBe"
            >
            </a>
            <a

              className="ItemPreviewPopOutButton-module_root-V4pNw"
              data-popup-button="true"
              // onClick={HandleviewDetail}
            >
              <button
                className="ItemPreviewPopOutButton-module_popupButton-NIvxj"
                title="View Details"
                onClick={HandleviewDetail}
              >
                <svg
                  viewBox="0 0 100 100"
                  className="ItemPreviewPopOutButton-module_expandIcon-bV8Gc"
                >
                  <path d="M3.563-.004a3.573 3.573 0 0 0-3.527 4.09l-.004-.02v28.141c0 1.973 1.602 3.57 3.57 3.57s3.57-1.598 3.57-3.57V12.218v.004l22.461 22.461a3.571 3.571 0 0 0 6.093-2.527c0-.988-.398-1.879-1.047-2.523L12.218 7.172h19.989c1.973 0 3.57-1.602 3.57-3.57s-1.598-3.57-3.57-3.57H4.035a3.008 3.008 0 0 0-.473-.035zM96.333 0l-.398.035.02-.004h-28.16a3.569 3.569 0 0 0-3.57 3.57 3.569 3.569 0 0 0 3.57 3.57h19.989L65.323 29.632a3.555 3.555 0 0 0-1.047 2.523 3.571 3.571 0 0 0 6.093 2.527L92.83 12.221v19.985a3.569 3.569 0 0 0 3.57 3.57 3.569 3.569 0 0 0 3.57-3.57V4.034v.004a3.569 3.569 0 0 0-3.539-4.043l-.105.004zM3.548 64.23A3.573 3.573 0 0 0 .029 67.8v28.626-.004l.016.305-.004-.016.004.059v-.012l.039.289-.004-.023.023.121-.004-.023c.074.348.191.656.34.938l-.008-.02.055.098-.008-.02.148.242-.008-.012.055.082-.008-.012c.199.285.43.531.688.742l.008.008.031.027.004.004c.582.461 1.32.742 2.121.762h.004l.078.004h28.61a3.569 3.569 0 0 0 3.57-3.57 3.569 3.569 0 0 0-3.57-3.57H12.224l22.461-22.461a3.569 3.569 0 0 0-2.492-6.125l-.105.004h.008a3.562 3.562 0 0 0-2.453 1.074L7.182 87.778V67.793a3.571 3.571 0 0 0-3.57-3.57h-.055.004zm92.805 0a3.573 3.573 0 0 0-3.519 3.57v19.993-.004L70.373 65.328a3.553 3.553 0 0 0-2.559-1.082h-.004a3.573 3.573 0 0 0-3.566 3.57c0 1.004.414 1.91 1.082 2.555l22.461 22.461H67.802a3.57 3.57 0 1 0 0 7.14h28.606c.375 0 .742-.059 1.082-.168l-.023.008.027-.012-.02.008.352-.129-.023.008.039-.02-.02.008.32-.156-.02.008.023-.016-.008.008c.184-.102.34-.207.488-.32l-.008.008.137-.113-.008.004.223-.211.008-.008c.156-.164.301-.34.422-.535l.008-.016-.008.016.008-.02.164-.285.008-.02-.008.016.008-.02c.098-.188.184-.406.246-.633l.008-.023-.004.008.008-.023a3.44 3.44 0 0 0 .121-.852v-.004l.004-.078V67.804a3.569 3.569 0 0 0-3.57-3.57h-.055.004z"></path>
                </svg>
              </button>
            </a>
          </div>
        </div>
        <div className="ContentGridItem-module_content-IvPkp">
          <header className="ContentGridItemHeader-module_root-V6iQb">
            <a
              href="/AJulietteDev"
              className="ContentGridItemHeader-module_authorAvatar-CWlbG"
            >
              <img
                src={user_details?.ProfileImage}
                alt="Profile image for Juliette"
                className="user-avatar"
                width="40"
                height="40"
              />
            </a>
            <div className="ContentGridItemHeader-module_titleAndAuthor-5w8I-">
              <h2
                className="ContentGridItemHeader-module_title-2dtMg"
                title="Web-developer"
              >
                <a
                  href="/AJulietteDev"
                  className="ContentGridItemHeader-module_authorName-DVdVc"
                >
                  {user_details?.Username}
                </a>
              </h2>
              <address className="ContentGridItemHeader-module_author-hJznl py-1">
                {user_details?.Followers.length} Followers
              </address>
            </div>
            <span
              title="Actions"
              data-test-id="action-menu"
              className="DropdownControlled-module_root-3ewM0 ItemActions-module_menu-zAWON ItemActions-module_menuSmall-qFHrQ MenuAction-module_root-6x9jg"
              data-direction="top left"
              data-open="false"
            >
              <span
                className="ItemActions-module_button-dkHvO"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg viewBox="0 0 29 7">
                  <circle cx="3.5" cy="3.5" r="3.5"></circle>
                  <circle cx="14.5" cy="3.5" r="3.5"></circle>
                  <circle cx="25.5" cy="3.5" r="3.5"></circle>
                </svg>
              </span>
              <div
                className="DropdownControlled-module_content-mxnG0"
                hidden=""
                role="menu"
                data-direction="top left"
              ></div>
            </span>
          </header>
          <footer className="ContentGridItemMeta-module_root-ga2Z+ ContentGridItemMeta-module_revealOnHover-7he0e">
            <button
              title="Love"
              data-stat="loves"
              data-item="Pen"
              data-hashid="OJyvgXZ"
              className="Button-module_root-xw+9D ContentGridItemMeta-module_stat-9ZbUV loves heart-button py-2"
              data-size="mini"
              onClick={liked == 0 ? handlelike : likecount > 0 && handledisliked}
            // onDoubleClick={handledisliked}
            >
              {
                liked == 0 ? (
                  <AiOutlineLike size={50} />
                )
                  : (<AiFillLike size={50} className={animate ? 'liked shake' : "liked"} onClick={handledisliked} />)
              }
              {/* <span className="screen-reader-text">Love</span> */}
              <span>{likecount}</span>
            </button>
            <a
              data-stat="comments"
              // href="/AJulietteDev/details/OJyvgXZ"
              className="Button-module_root-xw+9D ContentGridItemMeta-module_stat-9ZbUV p-0"
              data-size="mini"
              data-has-icon="true"
            >
              {/* <svg viewBox="-405.9 238 56.3 54.8" title="Comment">
                <path d="M-391 291.4c0 1.5 1.2 1.7 1.9 1.2 1.8-1.6 15.9-14.6 15.9-14.6h19.3c3.8 0 4.4-.8 4.4-4.5v-31.1c0-3.7-.8-4.5-4.4-4.5h-47.4c-3.6 0-4.4.9-4.4 4.5v31.1c0 3.7.7 4.4 4.4 4.4h10.4v13.5z"></path>
              </svg> */}
              {
                < Right_drawer comments={comments} _id={_id} show_comment={false} />
              }

            </a>
            <a
              data-stat="views"
              // href="/AJulietteDev/full/OJyvgXZ"
              // href={`/Project/${_id}/${Uid}`}
              className="Button-module_root-xw+9D ContentGridItemMeta-module_stat-9ZbUV"
              data-size="mini"
              onClick={HandleviewDetail}
              data-has-icon="true"
            >
              <span className="flex align-items-center justify-between">
                <span><GrFormView size={30} color="white" /></span>
                <span>{viewedcount}</span>
              </span>
            </a>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default ProjectCard;
