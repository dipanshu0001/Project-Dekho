import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { Avatar, Typography } from "@material-tailwind/react";
import { useFunction } from '../../Common_function_context/ContextProvide';
import { AiOutlineDislike, AiFillDislike, AiFillCheckCircle, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsFillBookmarkPlusFill, BsFillChatLeftTextFill, BsBuildingCheck } from "react-icons/bs";
import { CiBookmarkPlus } from "react-icons/ci";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { set_Username, UpdateSavedProjects, UpdateFollowing, UpdateFollowers } from '../../Actions/Actions';
import Right_drawer from './Right_drawer';
import { SlUserFollowing, SlUserFollow } from "react-icons/sl";
import axios from 'axios'
import './View_detail.css'
import View_sekeleton from './View_sekeleton';
import styled from 'styled-components'
import { useSocket } from '../../Common_function_context/SocketProvider';
import { MdOutlineMonetizationOn, } from "react-icons/md";
import { FaIndustry } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import ProjectCard from '../ProjectCard/ProjectCard';
import User_profile from '../User_Profile/User_profile';



function View_detail() {
  // const {set_err,setOpen}=useFunction();
  const socket = useSocket();
  const { _id, uid } = useParams();
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const userstate = useSelector(state => state.UserReducer)
  const cardstate = useSelector(state => state.CardReducer)
  const { changeToTime, set_err, setOpen, setProjectcounter } = useFunction()
  const [liked, setLiked] = useState(0); // !FOR LIKE HANDLING
  const [disliked, setDisliked] = useState(0); //! FOR DISLIKE HANDLING
  const [animate, setAnimate] = useState(null); // ! FOR ANIMATION WHEN USER LIKES A PROJECT
  const [saved, setSaved] = useState(0);
  const [recommended, setrecommended] = useState([]);
  const [isloaded, setLoaded] = useState(false);
  const [data, setData] = useState({
    likePeople: [],
    comments: [],
    Image: ""

  }); //! STORING CARD DETAILS USER CLICKED TO VIEW DETAILS ON
  const [userdata, setUser] = useState({
    Followers: []
  }); //! STORING CARD OWNER DETAILS

  const [isFollowing, setfollowing] = useState(false);
  const [reloadComponent, setreload] = useState(0);
  const [likecount, setlikecount] = useState(0);


  //! IF USER LIKE A PROJECT THEN CALLING TO INCREASE LIKE AND STORE ID IN BACKEND
  const increase_like = async () => {
    try {
      // console.log("called")
      setlikecount(prev => prev + 1)
      const result = await axios.post(`http://localhost:4000/Api/Projects/likecount/${data._id}/${1}/${userstate.Uid}`);
      setlikecount(prev => result.data.count)
      setProjectcounter(prev => prev + 1)

    } catch (e) {
      console.log(e.response.data)
    }
  }
  const handlelike = () => {
    // console.log(`${userstate.Username} like ${cardstate.Username} post`)

    if (userstate.accesstoken === "") {
      set_err("Your were Not logged in", 2)
      navigate('/login')
    }
    socket.emit("like", { from: userstate.Username, to: cardstate.Username });
    increase_like();
    setAnimate(true)
    setLiked(1);
    setDisliked(0);
    setTimeout(() => setAnimate(false), 2000)
  }
  const handlesave = async (value) => {
    if (userstate.accesstoken === "") {
      set_err("Your were Not logged in", 2)
      navigate('/login')
    }
    if (value === true) {
      try {
        setOpen(true);
        const result = await axios.post('http://localhost:4000/Api/User/SaveProject', { Uid: userstate.Uid, _id });
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
        const result = await axios.post('http://localhost:4000/Api/User/unSaveProject', { Uid: userstate.Uid, _id });
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
  //! IF USER DISLIKE A PROJECT THEN CALLING TO INCREASE DISLIKE AND STORE ID IN BACKEND
  const increase_dislike = async () => {
    try {
      setlikecount(prev => prev - 1)
      const result = await axios.post(`http://localhost:4000/Api/Projects/likecount/${data._id}/${0}/${userstate.Uid}`);
      setlikecount(prev => result.data.count)
      setProjectcounter(prev => prev + 1)


      socket.emit("like", { from: userstate.Username, to: cardstate.Username });
      // console.log(`${userstate.Username} like ${cardstate.Username} post`)

    } catch (e) {
      console.log(e.response.data)
    }
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


  const handlechat = () => {
    navigate('/chat');
  }
  const handleFollow = async () => {
    if (userstate.accesstoken === "") {
      set_err("Your were Not logged in", 2)
      navigate('/login')
    }
    console.log("followed was called")
    if (userstate.Uid === uid) return
    try {
      setOpen(true)
      const result = await axios.post(`http://localhost:4000/Api/User/Followers/${userstate.Uid}/${0}/${uid}`)
      console.log(result.data)
      Dispatch(UpdateFollowing(result.data.new_list))
      setOpen(false);
      set_err(result.data.message, result.data.type);
      setfollowing(true)
    } catch (err) {
      console.log(err);
      setOpen(false);
    }
  }
  const handleunFollow = async () => {
    if (userstate.Uid === uid) return
    console.log("unFollowed was called")

    try {
      setOpen(true)
      const result = await axios.post(`http://localhost:4000/Api/User/Followers/${userstate.Uid}/${1}/${uid}`)
      Dispatch(UpdateFollowing(result.data.new_list))
      setOpen(false);
      set_err(result.data.message, result.data.type);
      setfollowing(false)

    } catch (err) {
      console.log(err);
      setOpen(false);
    }
  }


  useEffect(() => {
    // console.log("Socket : ", socket);
    socket.emit("userjoin", userstate.Username);
  }, []);
  useEffect(() => {
    const get_data = async () => {
      // console.log(uid, _id)
      try {
        setLoaded(true);
        const result = await axios.post("http://localhost:4000/Api/Projects/Get_ParticularProject", { _id })
        // console.log(result.data.project)
        setData(prev => ({ ...prev, ...result.data.project }))
        setlikecount(result.data.project.likePeople.length)
        const userresult = await axios.post("http://localhost:4000/Api/User/Get_User", { uid: uid })

        setUser(prev => ({ ...prev, ...userresult.data.user }))
        Dispatch(set_Username(userresult.data.user.Username));
        // setOpen(true)
        // setLoaded(false)
      } catch (e) {
        console.log(e)
      }
    }
    const getAllProjects = async () => {
      try {
        const result = await axios.get("http://localhost:4000/Api/Projects/allProjects/6");

        setrecommended(result.data)
      } catch (e) {
        console.log(e.message)
      }
    }
    getAllProjects();
    get_data();
    const get_liked = async () => {
      try {
        const result = await axios.post('http://localhost:4000/Api/Projects/Already_liked', { user_uid: userstate.Uid, _id })
        // console.log(result.data.like, `${Name}`)
        setLiked(result.data.like);
      } catch (err) {
        console.log(err)
      }
    }

    get_liked();
    console.log(userstate)
    let found = userstate.SavedProjects.find(ele => ele.Project_id === _id);
    if (found !== undefined) {
      setSaved(true);
    }
    const following = userstate.Following.find((ele) => ele.User_id === uid);
    if (following !== undefined) {
      // console.log(userstate.Username)
      setfollowing(true);


    }

  }, [reloadComponent]);
  return (


    <>
      {
        isloaded ? (
          <div className="view-outer-display">
            <div className="content-main">
              <div className="view-outer">
                <h1>{data.Name}</h1>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar src={userdata.ProfileImage} alt="avatar" withBorder={true} className="p-0.5 avatar-div" />
                    <div className="flex-1">
                      <Typography variant="h6" className="flex flex-1 justify-between">
                        <div>
                          {userdata.Username}
                        </div>
                        {
                          isFollowing ?
                            <>
                              <SlUserFollowing onClick={handleunFollow} size={30} />
                            </>
                            : <>
                              <SlUserFollow onClick={handleFollow} size={30} />
                            </>
                        }
                      </Typography>
                      <Typography >{changeToTime(data.timestamp)}</Typography>
                    </div>
                  </div>
                </div>
                <hr />
                <div className='like-section'>
                  <div className='like-comment-div'>
                    <div className='like-div'>
                      {
                        liked == 0 ? (
                          <AiOutlineLike size={30} onClick={handlelike} />
                        )
                          : (<AiFillLike size={30} className={animate ? 'liked shake' : "liked"} onClick={handledisliked} />)
                      }
                      <p>{likecount}</p>
                    </div>
                    {/* <div className="dislike-div">

                                        {
                                            disliked == 0 ? (<AiOutlineDislike size={30} onClick={handledisliked} />)
                                                : (<AiFillDislike size={30} />)
                                        }
                                    </div> */}
                    <div className="comment-main-div">

                      {
                        <>
                          <Right_drawer comments={data.comments} _id={data._id} show_comment={true} setreload={setreload} />
                          {/* {data.comments.length} */}

                        </>
                      }
                    </div>

                    <div>
                      <BsFillChatLeftTextFill size={30} onClick={handlechat} />
                    </div>
                  </div>
                  <div className="saved-section">
                    {
                      !saved ? (<CiBookmarkPlus size={30}  onClick={() => handlesave(true)} />) : (<BsFillBookmarkPlusFill size={25}  onClick={() => handlesave(false)} />)
                    }
                  </div>

                </div>
                <hr />
                <div className="projectimage-div">
                  <img src={data.Image} />
                </div>
                <div className="view-description">
                  <h2>Description</h2>
                  <p>
                    {data.Description || ""}
                  </p>
                </div>
                <Container>
                  <div class="started-items">
                    <div class="itemwrapper">
                      <p>Industry</p>
                      <div class="started-items-item">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"> */}
                        {/* <path className='pathcls1' d="M24.7969 14.6719c.4375-.4414.4375-1.1524 0-1.5938-.4414-.4375-1.1524-.4375-1.5938 0L16.5 19.7851l-2.9531-2.957c-.4414-.4375-1.1524-.4375-1.5938 0-.4375.4414-.4375 1.1524 0 1.5938l3.75 3.75a1.1246 1.1246 0 0 0 1.5938 0Zm0 0" /> */}
                        {/* <path className='pathcls2' d="M18.8086.957a2.6005 2.6005 0 0 0-1.6172 0L4.8164 4.9688C3.7344 5.3202 3 6.3241 3 7.4648V15c0 9.2852 5.6563 16.0586 14.1016 19.246a2.5853 2.5853 0 0 0 1.7968 0C27.3438 31.0587 33 24.2853 33 15V7.4648a2.6182 2.6182 0 0 0-1.8164-2.496Zm-.9219 2.1368a.3738.3738 0 0 1 .2266 0l12.375 4.0117c.1601.0547.2617.1992.2617.3593V15c0 8.1914-4.9219 14.2227-12.6445 17.1367a.2815.2815 0 0 1-.211 0C10.172 29.2227 5.25 23.1914 5.25 15V7.4648c0-.1601.1016-.3046.2617-.3593Zm0 0" /> */}
                        {/* <MdOutlineMonetizationOn size={40} color="white"/> */}
                        <FaIndustry size={40} color="white" />
                        {/* </svg> */}
                      </div>
                      <p>{data.Industry}</p>
                    </div>
                    <div class="itemwrapper">
                      <p>Monetized</p>
                      <div class="started-items-item">
                        <MdOutlineMonetizationOn size={30} color="white" />
                      </div>
                      <p>{data.Monetized ? "YES" : "NO"}</p>
                    </div>
                    <div class="itemwrapper">
                      <p>Build</p>
                      <div class="started-items-item">
                        <BsBuildingCheck size={30} color="white" />
                      </div>
                      <p>{data.Build}</p>
                    </div>
                    <div class="itemwrapper">
                      <p>Price</p>
                      <div class="started-items-item">
                        <ImPriceTag size={30} color="white" />
                      </div>
                      <p>{data.Maxprice}</p>
                    </div>
                  </div>
                </Container>
                <div className="tech-stack">
                  <h4>Project Tech Stack is <span><b>MERN</b></span></h4>
                  <p className="info">
                    <span ><b>M</b></span> in MERN stack stands for MongoDB, which is a popular open-source NoSQL database that is widely used for web applications.
                    Unlike traditional SQL databases, MongoDB stores data in JSON-like documents that make it easy to store and retrieve data.
                    It is known for its flexibility and scalability,
                    which makes it a popular choice for web applications that require high performance and scalability.
                    MongoDB is also highly reliable and can handle large volumes of data,
                    making it a great choice for building complex applications.
                    <hr />
                  </p>
                  <p className="info">

                    <span ><b>E</b></span> in MERN stack stands for Express.js, which is a fast and lightweight web application framework that is used to build server-side applications. It provides a set of features that make it easy to handle HTTP requests and responses, manage middleware, and create APIs. With Express.js, developers can easily create robust and scalable web applications that can handle high traffic and complex tasks. It also allows developers to write server-side code in JavaScript, making it easy to build full-stack applications with the MERN stack.
                    <hr />

                  </p>
                  <p className="info">
                    <span ><b>R</b></span> in MERN stack stands for React, which is a popular JavaScript library that is used to build dynamic and interactive user interfaces. It provides a set of reusable UI components that can be easily integrated into web applications. With React, developers can create complex and interactive user interfaces that can handle different types of user interactions. It also allows developers to build applications that can work seamlessly across different devices and platforms.
                    <hr />

                  </p>
                  <p className="info">
                    <span ><b>N</b></span> in MERN stack stands for Node.js, which is a server-side JavaScript runtime that allows developers to build fast and scalable applications. It provides a set of built-in modules that can be used to handle different types of tasks, such as file handling, networking, and database operations. With Node.js, developers can easily build server-side applications that can handle high traffic and complex tasks. It also allows developers to use JavaScript on both client-side and server-side, making it easy to build full-stack applications with the MERN stack.
                    <hr />

                  </p>
                </div>
              </div>
              <div className="others-div">
                <div className="others-main">
                  <div className="flex items-center gap-4 w-100">
                    <Avatar src={userdata.ProfileImage} alt="avatar" variant="rounded" />
                    <div>
                      <Typography variant="h6">Uploaded By {userdata.Username}</Typography>
                      <Typography variant="small" className="font-normal">{userdata.Followers.length} Followers</Typography>
                    </div>
                  </div>
                  <hr />
                  <div className="other-recommendation">
                    <center><h3>Recommended For You</h3></center>
                    <div className="grid grid-cols-2">

                      {
                        recommended.length > 0 && recommended.map((ele, index) => (
                          <ProjectCard {...ele} key={index} />
                        ))
                      }
                    </div>

                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className="user-profile-div">
              <User_profile uid={uid} onFollow={handleFollow} onUnFollow={handleunFollow} isFollowing={isFollowing}/>
            </div>
          </div>

        ) : (<View_sekeleton />)
      }
    </>
  )
}
{/* </div> */ }

export default View_detail
{/* <Backdrop
sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
open={open}>
<CircularProgress color="inherit" />
</Backdrop> */}

const Container = styled.div`

    margin: 0;
    background-color: #252954;
   
  
  .hidden {
    display: none;
  }

  .pathcls1{
    stroke:none;fill-rule:nonzero;fill:#e0e0e0;fill-opacity:1;
    
  }

  .pathcls2{
    stroke:none;
    fill-rule:evenodd;
    fill:#e0e0e0;
    fill-opacity:1;
  }

  .pathcls3{
    stroke:none;
    fill-rule:evenodd;
    fill:#bdbdbd;
    fill-opacity:1;
  }
  

  .pathcls4{
    fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:#f2f2f2;stroke-opacity:1;stroke-miterlimit:4;
  }

  .pathcls5{
    fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:#fff;stroke-opacity:1;stroke-miterlimit:4;
  }


  .landingpage {
    margin: 0 auto;
    padding: 0 80px;
    position: relative;
    max-width: 100vw;
    
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #1F1D2B;
    
    &::before {
      content: "";
      position: absolute;
      width: 123px;
      height: 123px;
      left: 60%;
      top: 138px;
      filter: blur(90px);
      ${'' /* background-color: #FB37FF; */}
    }
    &::after {
      content: "";
      position: absolute;
      width: 123px;
      height: 123px;
      left: 80%;
      top: 550px;
      ${'' /* background-color: #18B2DE; */}
      filter: blur(80px);
    }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
      width: 100%;
    }
    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 80px;
    }
    .auction {
      margin-top: 100px;
    }
    .discover {
      display: flex;
      flex-direction: column;
    }
    .footer {
      margin: 50px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .footer2 {
      display: flex;
      justify-content: space-between;
      padding-bottom: 30px;
      border-top: 1px solid #F2F2F2;
    }
  }
  
  .navbar {
    .hamburgerlogowrap {
      display: flex;
      align-items: center;
    }
    .hamburger {
      display: none;
      color: #D7D7D7;
      background-color: #1F1D2B;
      border: none;
      margin-right: 10px;
    }
    .createbtn {
      cursor: pointer;
      background-color: transparent;
      border: none;
      width: 126px;
      height: 45px;
      color: #BCBCBC;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      &.selectedbtn {
        border: 1px solid #D7D7D7;
        border-radius: 10px;
      }
    }
    .navlogo {
      height: 100%;
      ${'' /* background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%); */}
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
    }
    .navlink {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      color: #BCBCBC;
      &.selectedlink {
        ${'' /* background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%); */}
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
        border-bottom: 1.5px solid #9B51E0;
      }
      &:not(:last-child) {
        margin-right: 32px;
      }
    }
  }
  .box {
    .infobox {
      animation-name: leftslide;
      animation-duration: 0.8s;
      max-height: 500px;
      max-width: 55%;
      overflow: hidden;
      &-boldtext {
        margin: 0;
        font-family: Poppins;
        color: #FFFFFF;
        font-size: 65px;
        font-weight: 600;
        line-height: 60px;
        letter-spacing: -2px;
        text-align: left;
      }
      &-slimtext {
        margin: 24px 0;
        font-family: Poppins;
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0.5px;
        text-align: left;
      }
      &-btnwrapper {
        display: flex;
      }
      &-explorebtn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1F1D2B;
        padding: 8px 38px;
        border-radius: 16px;
        
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        letter-spacing: -1px;
        color: #FFFFFF;
      }
      &-createbtn {
        cursor: pointer;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        padding: 8px 38px;
        border: 1px solid #D7D7D7;
        border-radius: 16px;
        
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        letter-spacing: -1px;
        color: #FFFFFF;
      }
      .selected {
        border: none;
        ${'' /* background: linear-gradient(103.91deg, #9B51E0 21.01%, rgba(48, 129, 237, 0.8) 100%); */}
      }
    }
    .display {
      animation-name: rightslide;
      animation-duration: 0.8s;
      padding: 14px;
      border: 1px solid;
      background: linear-gradient(169.44deg, rgba(58, 129, 191, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%);
      border-radius: 35px;
      max-height: 450px;
      max-width: 50%;
      overflow: hidden;
      &-nft {
        object-fit: cover;
        flex-shrink: 0;
        width: 300px;
        height: 300px;
        border-radius: 20px;
      }
      
      .infowrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
      }
      
      .info {
        display: flex;
        align-items: center;
        font-family: 'Poppins';
        font-style: normal;
        color: #FFFFFF;
        font-weight: 600;
        font-size: 12px;
        p {
          margin: 0;
        }
        &-img {
          object-fit: cover;
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .info2 {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-family: 'Poppins';
        color: #FFFFFF;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        p {
          margin: 0;
        }
        .iconwrapper {
          display: flex;
          align-items: center;
          svg {
            margin-right: 5px;
          }
        }
      }
    }
  }
  .auction {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 50px;
      .titlebold {
        margin: 0;
        font-family: 'Poppins';
        font-style: normal;
        color: #FFFFFF;
        font-weight: 500;
        font-size: 48px;
        line-height: 72px;
      }
      .titleslim {
        margin: 0;
        font-family: 'Poppins';
        font-style: normal;
        color: #D7D7D7;
        font-weight: 600;
        font-size: 18px;
        line-height: 36px;
        letter-spacing: -1px;
      }
    }
    .nft {
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-row-gap: 20px;
      grid-column-gap: 20px;
      justify-content: space-between;
    }
  }
  .started {
    // margin-top: 100px;
    display: flex;
    flex-direction: column;
    &-boldtext {
      margin: 0;
      align-self: center;
      font-family: "Poppins";
      font-style: normal;
      color: #FFFFFF;
      font-weight: 500;
      font-size: 40px;
      line-height: 72px;
    }
    &-slimtext {
      margin: 0;
      align-self: center;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 36px;
      letter-spacing: 0.5px;
      color: #E2E2E2;
    }
    &-items {
      padding: 60px 80px;
      position: relative;
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      justify-content: space-between;
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100px;
        top: 80px;
        filter: blur(80px);
        ${'' /* background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%); */}
      }
      .itemwrapper {
        p {
          width: 100px;
          margin: 0;
          margin-top: 10px;
          text-align: center;
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #FFFFFF;
        }
      }
      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border-radius: 18px;
        background-color: red;
        background: rgba(255, 255, 255, 0.095);
        box-shadow: inset 2.01px -2.01px 20px rgba(214, 214, 214, 0.17), inset -3.01333px 3.01333px 3.01333px rgba(255, 255, 255, 0.39);
        backdrop-filter: blur(74.4293px);
      }
    }
  }
  .discover {
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        letter-spacing: -1px;
        color: #FFFFFF;
      }
    }
    &-items {
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-row-gap: 20px;
      grid-column-gap: 20px;
      justify-content: space-between;
    }
    &-loadbtn {
      cursor: pointer;
      margin-top: 20px;
      align-self: center;
      width: 161px;
      height: 40px;
      border: 1px solid #D7D7D7;
      border-radius: 10px;
      background-color: transparent;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      letter-spacing: 1.5px;
      color: #BCBCBC;
    }
  }
  .footer {
    &-main {
      max-width: 40%;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 30px;
      line-height: 40px;
      color: #FFFFFF;
    }
    &-navigate {
      display: flex;
      .nav {
        margin-left: 60px;
        display: flex; 
        flex-direction: column;

        h5 {
          margin: 0;
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 30px;
          color: #FFFFFF;
        }
        p {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0.03em;
          color: #D7D7D7;
        }
      }
    }
  }
  .footer2 {
    p {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 36px;
      color: #828282;
    }
  }
  
  .item {
    display: flex;
    flex-direction: column;
    justify-self: center;
    &-img {
      object-fit: cover;
      flex-shrink: 0;
      width: 200px;
      height: 220px;
      border-radius: 10px;
      transition: .3s;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
      }
    }
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid white;
      
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 24px;
      color: #FFFFFF;
    }
    &-date {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 24px;
      color: #BCBCBC;
    }
  }
  .filters {
    display: flex;
    align-items: center;
    .filter {
      display: flex;
      align-items: center;
      margin-right: 30px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      color: #FFFFFF;
      svg {
        margin-right: 5px;
        margin-left: 5px;
      }
    }
    .filterbtn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 30px;
      ${'' /* background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%); */}
      border: none;
      border-radius: 10px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      color: #FFFFFF;
      svg {
        margin-right: 5px;
      }
    }
  }
  
  
  
  @media screen and (max-width: 1500px) {
   .landingpage {
    max-width: 100vw;
   }
  }
  
  @media screen and (max-width: 1040px) {
    .box {
      flex-direction: column;
      .infobox {
        max-height: 450px;
        max-width: none;
        margin-bottom: 50px;
      }
      .display {
        display: none;
        max-height: none;
        max-width: none;
      }
    }
    .auction {
      .nft {
        grid-template-columns: auto auto;
        justify-content: space-around;
      }
    }
    .discover-items {
      grid-template-columns: auto auto auto;
      justify-content: space-around;
    }
    .footer {
      flex-direction: column;
      &-main {
        max-width: 80%;
        margin-bottom: 50px;
        text-align: center;
      }
      &-navigate {
        .nav {
          &:first-child {
            margin: 0;
          }
        }
      }
    }
  }
  
  @media screen and (max-width: 925px) {
    .navlinkwrap {
      display: none;
    }
    .buttonwrap {
      display: none;
    }
    .hamburger {
      display: flex !important;
      align-items: center;
    }
    .started-slimtext {
      text-align: center;
    }
  }
  
  @media screen and (max-width: 825px) {
    .started-items {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: space-evenly;
      padding: 50px 0;
      &:before {
        height: 200px;
        top: 90px;
        filter: blur(120px);
      }
    }
    
    .discover-items {
      grid-template-columns: auto auto;
      justify-content: space-around;
    }
  }
  
  @media screen and (max-width: 700px) {
    .box {
      flex-direction: column;
      .infobox {
        max-height: none;
        max-width: none;
        margin-bottom: 50px;
      }
      .display {
        display: block;
        max-height: none;
        max-width: none;
      }
    }
    
    .discover-title {
      justify-content: center;
      .filters {
        display: none;
      }
    }
    .auction{
      .title {
        justify-content: center;
        .titleslim {
          display: none;
        }
      }
    }
  }
  
  @media screen and (max-width: 600px) {
    .landingpage {
      padding: 0 20px;
    }
    
    .box {
      .infobox {
        &-boldtext {
          font-size: 45px;
          line-height: 50px;
        }
        &-slimtext {
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
    .discover-items {
      grid-template-columns: auto;
      justify-content: space-around;
    }
    .auction {
      .nft {
        grid-template-columns: auto;
        justify-content: space-around;
      }
    }
    .footer-main {
      font-size: 20px;
      line-height: 30px;
      max-width: 100%;
      margin-bottom: 50px;
      text-align: center;
    }
    .footer-navigate {
      justify-content: space-between;
      width: 100%;
      .nav {
        margin-left: 20px;
        h5 {
          font-size: 15px;
          line-height: 30px;
        }
        p {
          font-size: 10px;
          line-height: 18px;
        }
      }
    }
  }
  
  @media screen and (max-width: 480px) {
    .landingpage{
      .box {
        .infobox {
          &-boldtext {
            font-size: 32px;
            line-height: 1.4em;
            text-align: center;
          }
          &-slimtext {
            text-align: center;
          }
          &-btnwrapper {
            justify-content: center;
          }
        }
      }
    }
  }
  
  @keyframes leftslide {
    from {transform: translateX(-700px);}
    to {transform: translateX(0px);}
  }
  
  @keyframes rightslide {
    from {transform: translateX(550px);}
    to {transform: translateX(0px);}
  }

`;
