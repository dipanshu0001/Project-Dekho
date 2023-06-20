import React, { useEffect, useState } from 'react'
import Login from './Pages/Login/Login'
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup/Signup'
import Home from './Pages/Home/Home'
// import Cookies from 'js-cookie'
import Carousel from './Pages/Carousel/Carousel'
import Modal_form from './Pages/Modal-form/Modal_form'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Login_User } from './Actions/Actions'
import NavBar from './Pages/Navbar/Navbar'
import SpeedDials from './Pages/Project_template/SpeedDial'
import 'flowbite';
import View_detail from './Pages/View_detail/View_detail'
import Admin_chat from "./components/Admin_chat";
import Chat from "./components/Chat";
import ViewAllProjects from './Pages/AllProjects/ViewAllProjects'
import AdminChat from "./components/AdminChat";
import Notify from "./components/Notify";
import UserChat from './components/UserChat'
import ProjectCard from './Pages/ProjectCard/ProjectCard'
import Homes from './components/Homes'
import Cards from './components/Cards'
import UserDashboard from './Pages/userDashboard/UserDashboard'
import Landing from './Pages/Landing/Landing'
import Contact from './Pages/Contact/Contact'
import Footer from './components/Footer'
import User_profile from './Pages/User_Profile/User_profile'
import WithoutNavbar from './WithoutNavbar'
import WithNavbar from './WithNavbar'
import VerficationModal from './Pages/Signup/VerficationModal'



const App = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [isUserDashboard, setisUserDashboard] = useState('0')
  // console.log(state);
  useEffect(() => {
    // console.log("called")
    const get_refresh_token = async () => {
      try {
        const result = await axios.post("https://project-dekho-backend.vercel.app/Api/RefreshToken", {}, { withCredentials: true });
        const { data: resdata } = result;
        dispatch(Login_User({ accesstoken: resdata.accesstoken, ...resdata.user }));
      } catch (e) {
        console.log(e.message)
      }
    }
    const checkLocation = () => {
      if (window.location.pathname === '/userDashboard') {
        setisUserDashboard(1);
      } else {
        setisUserDashboard(2);
      }
    }
    get_refresh_token();
    checkLocation();
  }, [state.UserReducer.accesstoken])
  // console.log(Cookies.get("refreshToken"))
  return (
    <>
    { process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PRO_MODE }

      <Router>
       
        {/* {isUserDashboard === 0 && ''}
        {isUserDashboard === 1 && ''}
        {isUserDashboard === 2 && <NavBar />} */}
        {!state.UserReducer.isAdmin && <Admin_chat />}
        <Routes>
           <Route element={<WithoutNavbar/>}>
             <Route path="/userDashboard" element={<UserDashboard />} />
             <Route  path='/login' element={<Login />} />
              <Route  path='/signup' element={<Signup />} />
           </Route>
            <Route element={<WithNavbar/>}>
              
              <Route  path='/' element={<Landing />} />

              <Route path='/Form' element={<Modal_form />} />
              <Route path='/contact' element={<Contact />} />
              <Route path="/Project/:_id/:uid" element={<View_detail />} />
              <Route  path="/home" element={<Admin_chat />} />
              <Route  path="/noti" element={<Notify />} />
              <Route  path="/chat" element={<Chat />} />
              <Route  path="/admin" element={<AdminChat />} />
              <Route  path="/user" element={<UserChat />} />
              <Route  path="/card" element={<Cards />} />
              <Route  path="/homes" element={<Homes />} />
              <Route  path="/ViewAll" element={<ViewAllProjects />} />
              <Route path="/verify/:user_gmail" element={<VerficationModal />} />
              <Route  path='*' element={<User_profile uid="0e22ba00-1558-48b8-b543-9aa624d7dba2"/>}/> 
           </Route>
 
        </Routes>
        {/* <Footer /> */}
        <ToastContainer />
      </Router>
    </>
  )
}

export default App