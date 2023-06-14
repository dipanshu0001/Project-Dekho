import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./sidebar.css";
import axios from "axios";
const SavedProjects = ({ state }) => {
  const [AllProjects, setAllProjects] = useState([]);
  useEffect(() => {
    const getAllProjects = async () => {
      const data = await axios.post(
        `${process.env.REACT_APP_PROXY}/Projects/Get_Saved_Projects`,state
      );
      setAllProjects(data.data);
    };
    getAllProjects();
  }, []);

  return (
    <>
      <div id="header">
        <h1>All Projects </h1>
      </div>
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

export default SavedProjects;
