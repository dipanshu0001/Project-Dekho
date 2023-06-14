import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useSelector } from 'react-redux';
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Right_comments from "./Right_comments";
import './View_detail.css'
import { Button as TailwindButton, Textarea } from "@material-tailwind/react";
import { AiOutlineComment } from "react-icons/ai";
import { useFunction } from "../../Common_function_context/ContextProvide";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Right_drawer({comments, _id,show_comment,setreload }) {
    const [state, setState] = React.useState(false);
    const{setOpen,set_err}= useFunction();
    const navigate=useNavigate();
    const [new_comment, setcomment] = useState("");
    const [alreadyCommented, setalreadycomment] = useState([])
    const userstate = useSelector(state => state.UserReducer)
    // console.log(alreadyCommented)
    useEffect(() => {
        setalreadycomment(prev => [...prev, ...comments]);
      }, [comments]);
    const toggleDrawer = (open) => (event) => {
        if (userstate.accesstoken === "") {
            set_err("Your were Not logged in", 2)
            navigate('/login')
          }
        if (event.type === "keydown") {
            return;
        }
        setState(open);
    };
    
    const handlecomment = async () => {
        if (userstate.accesstoken === "") {
            set_err("Your were Not logged in", 2)
            navigate('/login')
          }
        try {
            setOpen(true);
            // console.log(userstate.Uid,_id)
            const result = await axios.post(`http://localhost:4000/Api/Projects/comment/${userstate.Uid}/${_id}`, { comment: new_comment })
            // console.log(...result.data.new_comments);
            setalreadycomment(result.data.new_comments)
            setcomment("");
            setreload(prev=>prev+1)
            setOpen(false);
        } catch (err) {
            setOpen(false);
            // console.log(err.response.data)
        }
    }

    const list = (anchor) => (
        <Box
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className={"comment-div"}>
                <div className={"comment-main"}>
                    <div className={userstate.accesstoken !== "" ? "comment-user" : "hide-user"}>
                        <div className="user-detail">
                            {/* <div className="img-div"> */}
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
                    <div className={"comment-display"}>
                        <center>
                            <h4>Comments</h4>
                        </center>
                        {
                            alreadyCommented.length>0&&alreadyCommented.map((ele, index) =>
                            (
                                <Right_comments {...ele} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </Box>
    );
    // console.log(alreadyCommented.length)

    return (
        <div>
            <React.Fragment key="right">
                <Button onClick={toggleDrawer(true)}><AiOutlineComment size={show_comment?30:20} color={show_comment?"white":"white"}/><span className="text-white">{show_comment&&alreadyCommented.length}</span></Button>
                <Drawer
                    anchor="right"
                    open={state}
                    onClose={toggleDrawer(false)}
                >
                    {list("right")}
                </Drawer>
            </React.Fragment>
        </div>
    )
}

export default Right_drawer