import react, { useState } from 'react';
import '../Login/Logincss.css'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Carousel from '../Carousel/Carousel';
import axios from 'axios';
import * as yup from 'yup';
import { useFunction } from '../../Common_function_context/ContextProvide';


const Signup = () => {
  const state = useSelector(state => state.UserReducer)
  const navigate = useNavigate();
  const { set_err } = useFunction();
  const [data, setData] = useState({
    Username: "",
    Gmail: "",
    Password: "",
    ConfirmPassword: ""
  })
  const [error, setError] = useState({})
  // const [isvisible,setVisible]=useState(false);

  //! validation schema 
  const ValidationSchema = yup.object().shape({
    Username: yup.string().required("Name is Required"),
    Gmail: yup.string().email("Invalid email address").required("Email is Required"),
    Password: yup.string().min(8, "Password must be at least 8 character long")
      .max(20, "Password must be max 20 characters long ")
      .required("Password is Required")
  })
  //! to handle Validation of input fields filled by user
  const handleValidation = async (e) => {
    const { name, value } = e.target;
    try {
      await yup.reach(ValidationSchema, name).validate(value);
      setError(prev => ({ ...prev, [name]: null }))
    } catch (error) {
      setError(prev => ({ ...prev, [name]: error.message }))

    }
  }
  // ! handelSubmit to store usr Data in DB
  const handleSubmit = async () => {
    try {
      const img_form = new FormData();
      try{
      const avatar = await fetch(`https://ui-avatars.com/api/?name=${data.Username.split(' ').join('+')}&background=random`)
        .then(response => response.blob())
        img_form.append('avatar', avatar);
      }catch(e){
        console.log(e)
      }
      // console.log(img_form);
      img_form.append("userDetails",JSON.stringify(data))
      const result = await axios.post("http://localhost:4000/Api/Register", img_form);
      set_err(result.data.message, result.data.type)
      navigate('/login');
    } catch (e) {
      // set_err(e.response.data.error, e.response.data.type)
      console.log(e)
    }
  }
  //! Change function to store chang in each input fieds

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }))
  }
  // console.log(state)
  if (state.accesstoken !== "") {
    return navigate(-1);
  }
  return (
    <div className="main">
      <div className="container">
        <div className="forms">
          <div className="form-content">
            <div className="signup-form">
              <div className="title">Signup</div>
              <form action="#" onSubmit={e => e.preventDefault()}>
                <div className="input-boxes">
                  <div className="input-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Enter your Name"
                      name='Username'
                      value={data.Username}
                      onChange={handleChange}
                      onBlur={handleValidation}
                      
                      required />
                  </div>
                  {error.Username && <small style={{ color: "red" }} >{error.Username}</small>}
                  <div className="input-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-envelope-at-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
                      <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Enter your Email"
                      name='Gmail'
                      value={data.Gmail}
                      autoComplete='email'
                      onBlur={handleValidation}
                      onChange={handleChange}
                      required
                    />

                  </div>
                  {error.Gmail && <small style={{ color: "red" }} >{error.Gmail}</small>}
                  <div className="input-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      name='Password'
                      value={data.Password}
                      onBlur={handleValidation}
                      onChange={handleChange}
                      required
                    />

                  </div>
                  {error.Password && <small style={{ color: "red" }} >{error.Password}</small>}
                  <div className="input-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-lock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                    <input
                      type="password"
                      placeholder="Renter your password"
                      name='ConfirmPassword'
                      value={data.ConfirmPassword}
                      onChange={handleChange}
                      required
                    />

                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" onClick={handleSubmit} />
                  </div>
                  <div className="text sign-up-text">
                    Already have an account? <Link to="/login">Login now</Link>
                  </div>
                </div>
              </form>

              <div className="social_cont">
                <div className="seperator">
                  <span> or continue with </span>
                </div>

                <div className="social__media__container">
                  <a href="#" target="_blank" className="social codepen">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-google"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    </svg>
                  </a>
                  <a href="#" className="social google">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-twitter"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  </a>
                  <a href="#" target="_blank" className="social instagram">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-github"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="cover">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

// const Container = styled.div`

// `;

export default Signup;
