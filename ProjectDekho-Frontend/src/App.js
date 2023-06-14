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
        // console.log(resdata.user, "details");
        dispatch(Login_User({ accesstoken: resdata.accesstoken, ...resdata.user }));
        // setValidate(true);
        // navigate('/');
      } catch (e) {
        console.log(e.message)
        // setLoading(false)
        // setValidate(true)
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
        <Routes>

        </Routes>
      </Router>
      <Router>
        {isUserDashboard === 0 && ''}
        {isUserDashboard === 1 && ''}
        {isUserDashboard === 2 && <NavBar />}
        {!state.UserReducer.isAdmin && <Admin_chat />}
        <Routes>
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route path='/Form' element={<Modal_form />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/Project/:_id/:uid" element={<View_detail />} />
          <Route exact path="/home" element={<Admin_chat />} />
          <Route exact path="/noti" element={<Notify />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/admin" element={<AdminChat />} />
          <Route exact path="/user" element={<UserChat />} />
          <Route exact path="/card" element={<Cards />} />
          <Route exact path="/homes" element={<Homes />} />
          <Route exact path="/ViewAll" element={<ViewAllProjects />} />
          <Route exact path='*' element={<User_profile uid="0e22ba00-1558-48b8-b543-9aa624d7dba2"/>}/>  
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </>
  )
}

export default App