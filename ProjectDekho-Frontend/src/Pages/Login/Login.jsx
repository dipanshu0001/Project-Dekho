import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import "./Logincss.css";
import * as yup from 'yup';
import axios from "axios"
import Carousel from "../Carousel/Carousel";
import { Login_User } from '../../Actions/Actions'
import Modal_form from "../Modal-form/Modal_form";
import { useFunction } from "../../Common_function_context/ContextProvide";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {set_err}=useFunction();
  const [data, setData] = useState({
    Gmail: "",
    Password: ""
  })
  const [error, Seterror] = useState({})
  const [validate, setValidate] = useState(true);
  const [isloading, setLoading] = useState(true);
  const state = useSelector(state => state.UserReducer)
  const ValidationSchema = yup.object().shape({
    Gmail: yup.string().email("Enter Valid Email").required("Email is Required"),
    Password: yup.string().required("Passwrod is required")
  })

  //! handle Vlaidation on login form function
  const handleValidation = async (e) => {
    const { name, value } = e.target;
    try {
      await yup.reach(ValidationSchema, name).validate(value);
      Seterror(prev => ({ ...prev, [name]: null }))
    } catch (err) {
      Seterror(prev => ({ ...prev, [name]: err.message }))
    }
  }
  //! handle Submit of login form
  const handleSubmit = async () => {
    try {
      const result = await axios.post("http://localhost:4000/Api/Login", { ...data },{ withCredentials: true })
      const { data: resdata } = result;
      // console.log(resdata,"resdata");
      // console.log(resdata.accesstoken, "acesstoken");
      // console.log(resdata.user, "details");
      dispatch(Login_User({ accesstoken: resdata.accesstoken, ...resdata.user }));
      set_err(resdata.message, resdata.type)
      navigate('/');
    } catch (e) {
      set_err(e.response.data.message, e.response.data.type)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  // !to get a new Refresh token if user accesToken get destroyed
  useEffect(() => {
    // console.log("called")
    const get_refresh_token = async () => {
      try {
        const result = await axios.post("http://localhost:4000/Api/RefreshToken",{},{ withCredentials: true });
        const { data: resdata } = result;
        // console.log(resdata.user, "details");
        dispatch(Login_User({ accesstoken: resdata.accesstoken, ...resdata.user }));
        setValidate(true);
        navigate('/');
      } catch (e) {
        // console.log(e.message)
        setLoading(false)
        setValidate(true)
      }
    }
    get_refresh_token();
  }, [state.accesstoken])

  if (state.accesstoken !== "") {
    return <Modal_form />
  }
  return (
    <>
      {
        validate ? (<div className="main">
          <div className="container">
            <div className="forms">
              <div className="form-content">
                <div className="login-form">
                  <div className="title">Login</div>
                  <form action="#" onSubmit={e=>e.preventDefault()}>
                    <div className="input-boxes">
                      <div className="input-box" key={1}>
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
                          placeholder="Enter your email"
                          name="Gmail"
                          value={data.Gmail}
                          autoComplete="email"
                          onChange={handleChange}
                          onBlur={handleValidation}
                          required
                        />
                      </div>
                      {error.Gmail && <small style={{ color: "red" }} >{error.Gmail}</small>}
                      <div className="input-box" key={2}>
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
                          value={data.Password}
                          name="Password"
                          onChange={handleChange}
                          onBlur={handleValidation}
                          required
                        />
                      </div>
                      {error.Password && <small style={{ color: "red" }} >{error.password}</small>}

                      <div className="text">
                        <a href="#">Forgot password?</a>
                      </div>
                      <div className="button input-box">
                        <input type="submit" value="Submit" onClick={handleSubmit} />
                      </div>
                      <div className="text sign-up-text">
                        Don't have an account? <Link to="/signup">Signup now</Link>
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
        </div>) : (null)}
    </>
  )
};

// const Container = styled.div`

// `;

export default Login;
