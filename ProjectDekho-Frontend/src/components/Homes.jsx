import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useSocket } from '../contexts/SocketProvider';
// import { useChat } from '../contexts/ChatProvider';
import Admin_chat from './Admin_chat';
import ProjectCard from '../Pages/ProjectCard/ProjectCard';


const Homes = () => {
    // const [chatemail, setchatemail] = useState("");
    // const [email, setemail] = useState("");
    // const [show, setshow] = useState(false);
  
    // const socket = useSocket();
    // const navigate = useNavigate()
  
    // // const {useremail, changeemails} = useChat();
    
    
    // // const changeemail = (e) => {
    // //   setemail(e.target.value);
      
    // // };
  
  
    // const handelsubmit = () => {
    //   socket.emit("userjoin", email);
      
    //   console.log("Socket : ",socket)
    //   setshow(true);
      
    //   // changeemails(email, first);
      
    // };
    // const handels = () => {
      
    //   navigate("/chat");  
    // };
    return (
      <div>
        {/* <input type="email" onChange={(e)=> setemail(e.target.value)} />
        <button onClick={handelsubmit}> Click </button>
        <input type="email" onChange={(e)=> setchatemail(e.target.value)} />
        <button onClick={handels}> Click </button> */}
        

        <ProjectCard/>

       
        {/* { show && <Admin_chat email={email} chatemail={chatemail}/> } */}
        
      </div>
  )
}

export default Homes