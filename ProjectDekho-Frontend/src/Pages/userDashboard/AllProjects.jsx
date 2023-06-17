import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Modal_form from "../Modal-form/Modal_form";
import Login from "../Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../Modal-form/Modal_form.css'
import { Button as TailwindButton } from "@material-tailwind/react";
import { useFunction } from '../../Common_function_context/ContextProvide';
import "./sidebar.css";
import axios from "axios";
const AllProjects = ({ state }) => {
  const navigate = useNavigate();
  const [AllProjects, setAllProjects] = useState([]);
  const { set_err, setOpen } = useFunction();
  const [show, setShow] = useState(false);
  const [err, Seterr] = useState({});
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.UserReducer);
  const [data, setData] = useState({
    Name: "",
    Description: "",
    Contact: "",
    Github_react: "",
    Github_node: "",
    Deployed_link: "",
    Industry: "",
    Monetized: "false",
    Build: "",
    Minprice: "",
    Maxprice: "",
    _id:"",
  });

  //!validation Schema for form
  const ValidationSchema = yup.object().shape({
    Name: yup.string().required("Project Title required"),
    Description: yup
      .string()
      .min(50, "Minmum 50 character required")
      .required("Description is required"),
    Contact: yup
      .string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Contact number required"),
    Deployed_link: yup.string().required("Deployed link required"),
    Image: yup.string().required("Image required"),
    Industry: yup.string().required("Indusrty is required"),
    Minprice: yup
      .string()
      .matches(/^[0-9]{2,}$/, "Prize should be more than rupees 1000")
      .required("Minprize required"),
    Maxprice: yup
      .string()
      .matches(/^[0-9]{2,}$/, "Prize should be more than rupees 1000")
      .required("Maxprize required"),
    Monetized: yup
      .mixed()
      .oneOf(["false", "true"], "Please select any one of them")
      .required("It is required"),
    Build: yup
      .string()
      .matches(/^[0-9]{4}$/, "Enter valid year")
      .required("Build year required"),
  });

  
  //! Validation function for form
  const ValidateInput = async (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    try {
      await yup.reach(ValidationSchema, name).validate(value);
      Seterr((prev) => ({ ...prev, [name]: null }));
    } catch (err) {
      Seterr((prev) => ({ ...prev, [name]: err.message }));
    }
  };
  const handleShow = (data) =>
  {
    setData({
    Name: `${data.Name}`,
    Description: `${data.Description}`,
    Contact: `${data.Contact}`,
    Github_react: `${data.Github_react}`,
    Github_node: `${data.Github_node}`,
    Deployed_link: `${data.Deployed_link}`,
    Industry: `${data.Industry}`,
    Monetized: `${data.Monetized}`,
    Build: `${data.Build}`,
    Minprice: `${data.Minprice}`,
    Maxprice: `${data.Maxprice}`,
    _id:`${data._id}`
  })
    setShow(true);
  } 
  const set_value = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleClose = () => {
    navigate("/userDashboard");
    setShow(false);
  };
  const handleSubmit = async () => {
    try {
      setOpen(true);
      const formdata = new FormData();
      formdata.append("Name", data.Name);
      formdata.append("_id", data._id);
      formdata.append("Uid", user.Uid);
      formdata.append("Description", data.Description);
      formdata.append("Contact", data.Contact);
      formdata.append("Github_react", data.Github_react);
      formdata.append("Github_node", data.Github_node);
      formdata.append("Deployed_link", data.Deployed_link);
      formdata.append("Image", images);
      formdata.append("Industry", data.Industry);
      formdata.append("Minprice", data.Minprice);
      formdata.append("Maxprice", data.Maxprice);
      formdata.append("Build", data.Build);
      formdata.append("Monetized", data.Monetized);
      const result = await axios.post(
        "http://localhost:4000/Api/User/UpdateProject",
        formdata
      );
      set_err(result.data.message, result.data.type);
      setData({
        Name: "",
        Description: "",
        Contact: "",
        Github_react: "",
        Github_node: "",
        Deployed_link: "",
        Industry: "",
        Monetized: "false",
        Build: "",
        Minprice: "",
        Maxprice: "",
      });
      setAllProjects('')
      axios.get(
        `${process.env.REACT_APP_PROXY}/Projects/Get_ParticularProject_User/${state.Uid}`
      )
      .then((alldata) => {
          setAllProjects(alldata.data.result);
          handleClose();
          setOpen(false);
          setImages('');
      })
      .catch((err) => {
          console.error('Error:', err);

      });

    } catch (e) {
      set_err(e.response.data.message, e.response.data.type);
      setOpen(false);
    }
  };

  const handleGithubReact = async () => {
    if (data.Github_react === "") return;
    console.log(data.Github_react);
    try {
      const result = await axios.post(
        "http://localhost:4000/Api/User/CheckReactRepo",
        { link: data.Github_react }
      );
      console.log(result.data);
      // set_err(result.data.message, result.data.type)
      // setData(prev=>({...prev,Github_react:""}))
    } catch (e) {
      console.log(e.response.data.message, e.response.data.type);
      set_err(e.response.data.message, e.response.data.type);
    }
  };
  const handleGithubNode = async () => {
    if (data.Github_node === "") return;
    try {
      const result = await axios.post(
        "http://localhost:4000/Api/User/CheckNodeRepo",
        { link: data.Github_node }
      );
      // console.log(result.data);
      // setData(prev=>({...prev,Github_node:""}))
    } catch (e) {
      // console.log(e.response)
      set_err(e.response.data.message, e.response.data.type);
    }
  };
  const Typeoptions = [
    { label: "hello world" },
    { label: "Hello earth" },
    { label: "hello mint" },
    { label: "Project" },
    { label: "Project Dekho" },
  ];
  useEffect(() => {
    const getAllProjects = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_PROXY}/Projects/Get_ParticularProject_User/${state.Uid}`
      );
      setAllProjects(data.data.result);
    };
    getAllProjects();
  },[]);

  return (
    <>
      <div id="header">
        <h1>All Projects </h1>
      </div>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          className="bg-indigo-800 bg-opacity-25 border-t-2 border-l-2 border-r-2 border-gray-600"
        >
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-indigo-800 bg-opacity-10 border-l-2 border-r-2 border-gray-600">
          <form onSubmit={(e) => e.preventDefault()}>
            <>
              <input
                className="inputs-css w-full"
                placeholder="Project Title"
                name="Name"
                size="large"
                required
                value={data.Name}
                onChange={set_value}
                onBlur={ValidateInput}
              />
              {err.Name && <small style={{ color: "red" }}>{err.Name}</small>}
            </>
            <>
              <textarea
                type="text"
                rows={5}
                name="Description"
                className="resize-none inputs-css"
                placeholder="Description about Project in max 50-60 words"
                value={data.Description}
                onChange={set_value}
                required
                onBlur={ValidateInput}
              />
              {err.Description && (
                <small style={{ color: "red" }}>{err.Description}</small>
              )}
            </>
            <>
              <input
                name="Contact"
                pattern="[0-9]*"
                className="inputs-css"
                placeholder="Contact Number"
                value={data.Contact}
                onChange={set_value}
                onBlur={ValidateInput}
                maxlength="10"
                required
              />
              {err.Contact && (
                <small style={{ color: "red" }}>{err.Contact}</small>
              )}
            </>
            <>
              <input
                name="Github_react"
                className="inputs-css"
                placeholder="Github React Link"
                value={data.Github_react}
                onChange={set_value}
                onBlur={handleGithubReact}
                required
              />
            </>
            {<small style={{ color: "gray" }}>*Please enter Public Repo</small>}
            <>
              <input
                name="Github_node"
                className="inputs-css"
                placeholder="Github Node Link"
                value={data.Github_node}
                onChange={set_value}
                onBlur={handleGithubNode}
                required
              />
              {
                <small style={{ color: "gray" }}>
                  *Please enter Public Repo
                </small>
              }
            </>
            <>
              <input
                name="Deployed_link"
                className="inputs-css"
                placeholder="Deployed Link"
                value={data.Deployed_link}
                onBlur={ValidateInput}
                onChange={set_value}
                required
              />
              {err.Deployed_link && (
                <small style={{ color: "red" }}>{err.Deployed_link}</small>
              )}
            </>
            <>
              <input
                name="Image"
                type="file"
                onChange={(e) => setImages(e.target.files[0])}
                className="uploads-css"
                // placeholder="Deployed Link"
                onBlur={ValidateInput}
                required
              />

              {err.Image && <small style={{ color: "red" }}>{err.Image}</small>}
            </>
            <>
              <Autocomplete
                disablePortal
                className="w-full inputs-css"
                id="combo-box-demo"
                value={data.Industry || null}
                onChange={(event, value) =>
                  setData((prev) => ({ ...prev, Industry: value.label }))
                }
                // onChange={e=>console.log(e)}
                options={
                  !Typeoptions ? [{ label: "Loading...", id: 0 }] : Typeoptions
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Industry" />
                )}
              />
            </>
            <div className="flex flex-auto flex-wrap justify-around input-flex">
              <div className="w-5/12 text-center">
                <>
                  <h5>Monetized</h5>
                  {err.Monetized && (
                    <small style={{ color: "red" }}>{err.Monetized}</small>
                  )}
                </>
                <div className="flex justify-around w-100 ">
                  <span className="flex justify-between align-items-center ">
                    <input
                      type="radio"
                      name="Monetized"
                      className="inputs-css w-1/2"
                      placeholder="expecting Price"
                      value="false"
                      onChange={set_value}
                      required
                      default
                    />
                    <label className="w-1/3">No</label>
                  </span>
                  <span className="flex justify-between align-items-center ">
                    <input
                      type="radio"
                      name="Monetized"
                      className="inputs-css w-1/2"
                      placeholder="expecting Price"
                      value="true"
                      onChange={set_value}
                      required
                    />
                    <label className="w-1/3">Yes</label>
                  </span>
                </div>
              </div>
              <div className="w-5/12 text-center">
                <input
                  name="Build"
                  type="text"
                  className="inputs-css w-100"
                  placeholder="Year when Build"
                  value={data.Build}
                  onChange={set_value}
                  onBlur={ValidateInput}
                  required
                />
                {err.Build && (
                  <small style={{ color: "red" }}>{err.Build}</small>
                )}
              </div>
            </div>
            <div className="w-100 mt-2 ">
              <div className="w-100 text-center">
                <h5>Price Range</h5>
                <div className="flex justify-around w-100 input-flex">
                  <div className="flex flex-col w-5/12">
                    <input
                      type="text"
                      name="Minprice"
                      className="inputs-css w-100"
                      placeholder="Minimum Price"
                      value={data.Minprice}
                      onBlur={ValidateInput}
                      onChange={set_value}
                      required
                    />
                    {err.Minprice && (
                      <small style={{ color: "red" }}>{err.Minprice}</small>
                    )}
                  </div>

                  <div className="flex flex-col w-5/12">
                    <input
                      type="text"
                      name="Maxprice"
                      className="inputs-css w-100"
                      placeholder="Maximum Price"
                      value={data.Maxprice}
                      onBlur={ValidateInput}
                      onChange={set_value}
                      required
                    />
                    {err.Maxprice && (
                      <small style={{ color: "red" }}>{err.Maxprice}</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-blue-500 bg-opacity-75 border-b-2 border-l-2 border-r-2 border-gray-600">
          <button onClick={handleClose} className="btn-lime bg-gray-300">
            Close
          </button>
          <button
            variant="primary"
            onClick={() => {
              handleSubmit();
            }}
            className="btn-lime"
          >
            Submit Project
          </button>
        </Modal.Footer>
      </Modal>
      <div class="container">
        {AllProjects &&
          AllProjects.map((ele, index) => (
            <>
              <div class="card">
                <div class="card-image">
                  <img src={ele.Image} />
                </div>
                <div class="card-text" style={{ overflow: "hidden" }}>
                  <p class="card-meal-type">Username</p>
                  <h2 class="card-title">Title/Industry</h2>

                  <p class="card-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </p>
                  <button onClick={()=>handleShow(ele)}>EDIT</button>
                </div>
                
                <div class="card-price">
                  <CurrencyRupeeIcon sx={{ fontSize: "1.7rem" }} /> 1000
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default AllProjects;
