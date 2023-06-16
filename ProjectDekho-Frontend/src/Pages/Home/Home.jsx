import React, { useState } from 'react'
import Home_About from '../../image/About_Home.png'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { Set_Projects } from '../../Actions/Actions'
import ProjectDisplay from '../Project_template/ProjectDisplay.jsx'
import Button from '../Buttons/Button';
import Like_carousel from './Like_carousel'

import Comment from './Comment'
import Carousel_card from './Carousel_card'
import ProjectCard from '../ProjectCard/ProjectCard'
import ProjectCardOuter from '../ProjectCard/ProjectCardOuter'
import Footer from '../../components/Footer'
const Home = () => 
{
  const dispatch = useDispatch();
  const projects = useSelector(state => state.ProjectReducers.payload)
  const user = useSelector(state => state.UserReducer)
  const [comment, setcomment] = useState("");

  const count_handler = async (id, check, user) => {
    try {
      // console.log(user)
      const result = await axios.get(`http://localhost:4000/Api/Projects/likecount/${id}/${check}/${user}`);
      // console.log(result)

    } catch (e) {
      console.log(e.message)
    }
  }
 



  return (
    <>

      <div className='Home_page'>
        <div className='grid' style={{ height: '90vh',gridTemplateColumns: "40% 40%", justifyContent: 'space-around' }}>
          <div className='flex items-center justify-center'><img className='home_image' src={require('../../image/About_Home.png')}></img></div>
          {/* <div> Our platform makes it easy to share your ideas and sell your projects with convenience. </div> */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="wrapper">

              <ul className="dynamic-txts">
                <li><span> Our platform  </span></li>
                <li><span> Makes it easy </span></li>
                <li><span> To share your ideas </span></li>
                <li><span>  And sell your projects</span></li>


              </ul>


            </div>
          </div>
        </div>
        {/* <div className='carousel'> */}
        <Like_carousel /> 
        <div>
          <ProjectCardOuter/>
        </div>
        
      </div>
      <Footer/>
    </>

  )
}

export default Home