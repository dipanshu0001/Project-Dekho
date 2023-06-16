import axios from 'axios';
import React, { useState } from 'react'

const Comment = ({user,id}) => {
    const [comment, setcomment] = useState("");

    const sendComment = async (data) => {
        try {
          const result = await axios.post(`http://localhost:4000/Api/Projects/comment/${user.Username}/${id}`,data);
          // console.log(result.data)
          setcomment("")
  
        } catch (e) {
          console.log(e.message)
        }
      }   
  return (
    <>
     
    <input name="comment"  placeholder="Add your comment" value={comment} onChange={(e)=>setcomment(e.target.value)} required />
    <button style={{color:'ActiveBorder'}} type='submit' onClick={()=>sendComment({comment:comment})}>comment</button>
    
    </>
  )
}

export default Comment