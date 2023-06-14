import React from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import "./sidebar.css";
const AllProjects = () => {
  return (
    <>
      <div id="header">
        <h1>All Projects </h1>
      </div>
      <div class="container">
        <div class="card">
          <div class="card-image">
            <img src="https://th.bing.com/th/id/OIP.GsDGrlXuoaI89geadFH0bQHaEK?pid=ImgDet&rs=1" />
          </div>
          <div class="card-text" style={{overflow:'hidden'}}>
            <p class="card-meal-type">Username</p>
            <h2 class="card-title">Title/Industry</h2>
           
            <p class="card-body" >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua

            </p>
          </div>
          <div class="card-price"><CurrencyRupeeIcon sx={{fontSize:'1.7rem'}} /> 1000</div>
        </div>
        <div class="card">
          <div class="card-image">
            <img src="https://th.bing.com/th/id/OIP.GsDGrlXuoaI89geadFH0bQHaEK?pid=ImgDet&rs=1" />
          </div>
          <div class="card-text" style={{overflow:'hidden'}}>
            <p class="card-meal-type">Username</p>
            <h2 class="card-title">Title/Industry</h2>
           
            <p class="card-body" >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua

            </p>
          </div>
          <div class="card-price"><CurrencyRupeeIcon sx={{fontSize:'1.7rem'}} /> 1000</div>
        </div>
        <div class="card">
          <div class="card-image">
            <img src="https://th.bing.com/th/id/OIP.GsDGrlXuoaI89geadFH0bQHaEK?pid=ImgDet&rs=1" />
          </div>
          <div class="card-text" style={{overflow:'hidden'}}>
            <p class="card-meal-type">Username</p>
            <h2 class="card-title">Title/Industry</h2>
           
            <p class="card-body" >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua

            </p>
          </div>
          <div style={{display:'flex'}}>
          <div class="card-price"><CurrencyRupeeIcon sx={{fontSize:'1.7rem'}} /> 1000</div>
          
          </div>
        </div>
        
      </div>
    </>
  );
};

export default AllProjects;
