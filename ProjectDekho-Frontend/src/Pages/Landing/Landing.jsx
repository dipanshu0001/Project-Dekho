import React from 'react'
import styled from 'styled-components'
import ProjectCardOuter from '../ProjectCard/ProjectCardOuter';
import Like_carousel from '../Home/Like_carousel';
import { useNavigate } from 'react-router-dom';
import { Button as TailwindButton } from "@material-tailwind/react";


const Landing = () => {
  const navigate=useNavigate();
  return (
    <Container>
      <div class="landingpage">

        <div class="box mb-[3rem]">
          <div class="infobox flex flex-col gap-[2rem]">
            <p class="infobox-boldtext">
              Discover, collect, and charity in extraordinary Project marketplace
            </p>
            <p class="infobox-slimtext">
              Explore all projects
            </p>
            <div class="infobox-btnwrapper">
              <a href="#homeprojects"><button class="infobox-explorebtn selected">Explore</button></a>
              {/* <button class="infobox-createbtn">Create</button> */}
            </div>
          </div>
          <div class="display">
            <img class="display-nft" src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="unsplash-OG44d93i-NJk" border="0" />
            <div class="infowrapper">
              <div class="info">
                <img class="info-img" src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80" alt="unsplash-OG44d93i-NJk" border="0" />
                <div>
                  <p>Laura</p>
                  <p>0.21 Weth</p>
                </div>
              </div>
              <div class="info2">
                <p>WE ARE HERE</p>
                <div class="iconwrapper">
                  <svg width="22" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.7365 2C3.6575 2 1.5 3.8804 1.5 6.5135c0 3.1074 2.3236 5.9603 4.8612 8.1207 1.2458 1.0606 2.4954 1.9137 3.4352 2.5022.4692.2937.8593.5203 1.1305.6727L11 17.85l.0731-.0409a27.984 27.984 0 0 0 1.1304-.6727c.9399-.5885 2.1895-1.4416 3.4353-2.5022C18.1764 12.4738 20.5 9.6209 20.5 6.5135 20.5 3.8805 18.3425 2 16.2635 2c-2.1054 0-3.8008 1.389-4.552 3.6426a.75.75 0 0 1-1.423 0C9.5373 3.389 7.8418 2 5.7365 2ZM11 18.7027l.3426.6672a.7502.7502 0 0 1-.6852 0L11 18.7027ZM0 6.5135C0 3.052 2.829.5 5.7365.5 8.0298.5 9.8808 1.7262 11 3.6048 12.1192 1.7262 13.9702.5 16.2635.5 19.171.5 22 3.052 22 6.5135c0 3.8183-2.8014 7.06-5.3888 9.2628-1.3167 1.121-2.6296 2.0166-3.6116 2.6314-.4918.308-.9025.5467-1.1918.7092a19.142 19.142 0 0 1-.4301.2347l-.0248.013-.007.0036-.0021.0011c-.0003.0001-.0012.0006-.3438-.6666-.3426.6672-.3424.6673-.3426.6672l-.0033-.0017-.007-.0036-.0248-.013a19.142 19.142 0 0 1-.4301-.2347 29.324 29.324 0 0 1-1.1918-.7092c-.982-.6148-2.295-1.5104-3.6116-2.6314C2.8014 13.5735 0 10.3318 0 6.5135Z" fill="#E0E0E0" />
                  </svg>
                  25
                </div>
              </div>
            </div>
          </div>
        </div>


        <Like_carousel />

        <div class="started">
          <p class="started-boldtext">Getting started</p>
          <p class="started-slimtext">Projet Dekho Provides Best service in all aspects</p>
          <div class="started-items">
            <div class="itemwrapper">
              <div class="started-items-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                  <path className='pathcls1' d="M24.7969 14.6719c.4375-.4414.4375-1.1524 0-1.5938-.4414-.4375-1.1524-.4375-1.5938 0L16.5 19.7851l-2.9531-2.957c-.4414-.4375-1.1524-.4375-1.5938 0-.4375.4414-.4375 1.1524 0 1.5938l3.75 3.75a1.1246 1.1246 0 0 0 1.5938 0Zm0 0" />
                  <path className='pathcls2' d="M18.8086.957a2.6005 2.6005 0 0 0-1.6172 0L4.8164 4.9688C3.7344 5.3202 3 6.3241 3 7.4648V15c0 9.2852 5.6563 16.0586 14.1016 19.246a2.5853 2.5853 0 0 0 1.7968 0C27.3438 31.0587 33 24.2853 33 15V7.4648a2.6182 2.6182 0 0 0-1.8164-2.496Zm-.9219 2.1368a.3738.3738 0 0 1 .2266 0l12.375 4.0117c.1601.0547.2617.1992.2617.3593V15c0 8.1914-4.9219 14.2227-12.6445 17.1367a.2815.2815 0 0 1-.211 0C10.172 29.2227 5.25 23.1914 5.25 15V7.4648c0-.1601.1016-.3046.2617-.3593Zm0 0" />
                </svg>
              </div>
              <p>Security Top most</p>
            </div>
            <div class="itemwrapper">
              <div class="started-items-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                  <path className="pathcls3" d="M4.125 3C2.6758 3 1.5 4.1758 1.5 5.625v5.25c0 1.4492 1.1758 2.625 2.625 2.625h27.75c1.4492 0 2.625-1.1758 2.625-2.625v-5.25C34.5 4.1758 33.3242 3 31.875 3Zm27.75 2.25H4.125c-.207 0-.375.168-.375.375v5.25c0 .207.168.375.375.375h27.75c.207 0 .375-.168.375-.375v-5.25c0-.207-.168-.375-.375-.375Zm0 0" />
                  <path className="pathcls3" d="M4.125 15c.621 0 1.125.504 1.125 1.125v14.25c0 .207.168.375.375.375h24.75c.207 0 .375-.168.375-.375v-14.25c0-.621.504-1.125 1.125-1.125S33 15.504 33 16.125v14.25C33 31.8242 31.8242 33 30.375 33H5.625C4.1758 33 3 31.8242 3 30.375v-14.25C3 15.504 3.504 15 4.125 15Zm0 0" />
                  <path className="pathcls3" d="M14.625 17.25c-.621 0-1.125.504-1.125 1.125s.504 1.125 1.125 1.125h6.75c.621 0 1.125-.504 1.125-1.125s-.504-1.125-1.125-1.125Zm0 0" />
                </svg>
              </div>
              <p>Best Service 24/7</p>
            </div>
            <div class="itemwrapper">
              <div class="started-items-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="px" viewBox="0 0 36 31">
                  <path className="pathcls3" d="M2.832 2.9219c-.2148 0-.3867.1758-.3867.3906v24.375c0 .2148.1719.3906.3867.3906h4.9453l13.332-14.1875c1.0548-1.121 2.8165-1.1445 3.8985-.0508l8.5469 8.6407V3.3125c0-.2148-.1719-.3906-.3867-.3906Zm30.336 27.5156H2.832c-1.5039 0-2.7226-1.2305-2.7226-2.75V3.3125c0-1.5195 1.2187-2.75 2.7226-2.75h30.336c1.5039 0 2.7226 1.2305 2.7226 2.75v24.375c0 1.5195-1.2187 2.75-2.7226 2.75ZM22.8008 15.5156 10.996 28.0781H33.168c.2148 0 .3867-.1758.3867-.3906v-1.871L23.3594 15.5077a.388.388 0 0 0-.5586.0078Zm-9.4688-4.3398c0 1.5195-1.2187 2.75-2.7226 2.75-1.5 0-2.7188-1.2305-2.7188-2.75 0-1.5196 1.2188-2.75 2.7188-2.75 1.5039 0 2.7226 1.2304 2.7226 2.75Zm2.336 0c0 2.8242-2.2657 5.1094-5.0586 5.1094-2.789 0-5.0547-2.2852-5.0547-5.1094s2.2656-5.1094 5.0547-5.1094c2.793 0 5.0586 2.2852 5.0586 5.1094Zm0 0" />
                </svg>
              </div>
              <p>Best Project Featured</p>
            </div>
            <div class="itemwrapper">
              <div class="started-items-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                  <path className="pathcls3" d="M30.9453.5a16.7245 16.7245 0 0 0-11.4687 4.5508l-2.0274 1.914a35.9135 35.9135 0 0 0-2.3984 2.4805h-7.836c-.957 0-1.8437.5-2.3359 1.3203L.668 17.7891c-.1952.3242-.2226.7226-.0702 1.0664.1523.3476.4609.5976.828.6758l7.1134 1.496c.0586.0782.125.1485.1992.2188l3.1054 2.914 2.9102 3.1016c.0703.0742.1406.1406.2188.1992l1.496 7.1133c.0782.3672.3282.6758.6758.8281a1.158 1.158 0 0 0 1.0664-.0703l7.0235-4.211a2.7222 2.7222 0 0 0 1.3203-2.3358v-7.836a36.8748 36.8748 0 0 0 2.4844-2.3984l1.9101-2.0274A16.7411 16.7411 0 0 0 35.5 5.0508l-.004-1.8281C35.496 1.7187 34.2774.5 32.7774.5Zm-6.7226 22.3398a39.89 39.89 0 0 1-1.582 1.1172l-5.2813 3.5196 1.0547 5.0156 5.621-3.3711c.1172-.0703.1876-.1992.1876-.336ZM8.5234 18.6406l3.5196-5.2812a34.8776 34.8776 0 0 1 1.1172-1.582H7.2148a.3952.3952 0 0 0-.3359.1913L3.508 17.586ZM21.0781 6.75a14.3862 14.3862 0 0 1 9.8672-3.918h1.832c.211 0 .3868.1758.3868.3907v1.828c0 3.672-1.3985 7.2032-3.9141 9.8712l-1.9102 2.0273a34.7388 34.7388 0 0 1-5.996 5.0664l-5.1133 3.4102-2.711-2.8906c-.0195-.0157-.0351-.0352-.0547-.0508l-2.8906-2.7149 3.4102-5.1172c1.457-2.1796 3.1523-4.1914 5.0625-5.9921Zm5.4766 5.0273c0 1.2891-1.043 2.332-2.332 2.332-1.2891 0-2.332-1.0429-2.332-2.332 0-1.289 1.0429-2.332 2.332-2.332 1.289 0 2.332 1.043 2.332 2.332ZM9.4453 32c1.3985-1.3984 1.3985-4.043 0-5.4453-1.4023-1.3985-4.0469-1.3985-5.4453 0-1.879 1.8828-2.246 6.0703-2.3164 7.3789a.3609.3609 0 0 0 .3828.3828C3.375 34.2461 7.5625 33.879 9.4454 32Zm0 0" />
                </svg>
              </div>
              <p>Best Performance</p>
            </div>
          </div>
        </div>

        <div class="discover " id='homeprojects'>
          <ProjectCardOuter />
          <TailwindButton onClick={()=>navigate("/ViewAll")}>Show More</TailwindButton>

        </div>
        <div class="footer">
          <div class="footer-main">
            Project Dekho Provides you a best platform where you expore, share, like all favourite projects
          </div>
          <div class="footer-navigate">
            <div class="nav">
              <h5>Marketplace</h5>
              <p>Home</p>
              <p>Activity</p>
              <p>Discover</p>
              <p>Learn more</p>
            </div>
            <div class="nav">
              <h5>Company</h5>
              <p>About Us</p>
              <p>Services</p>
              <p>Portfolio</p>
            </div>
            <div class="nav">
              <h5>Contact</h5>
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
              <p>Email</p>
            </div>
          </div>
        </div>
        <div class="footer2">
          <div></div>
          {/* <p>Copyright 2021 Gaslur</p> */}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`

    margin: 0;
    background-color: #252954;
   
  
  .hidden {
    display: none;
  }

  .pathcls1{
    stroke:none;fill-rule:nonzero;fill:#e0e0e0;fill-opacity:1;
    
  }

  .pathcls2{
    stroke:none;
    fill-rule:evenodd;
    fill:#e0e0e0;
    fill-opacity:1;
  }

  .pathcls3{
    stroke:none;
    fill-rule:evenodd;
    fill:#bdbdbd;
    fill-opacity:1;
  }
  

  .pathcls4{
    fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:#f2f2f2;stroke-opacity:1;stroke-miterlimit:4;
  }

  .pathcls5{
    fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:#fff;stroke-opacity:1;stroke-miterlimit:4;
  }


  .landingpage {
    margin: 0 auto;
    padding: 0 80px;
    position: relative;
    max-width: 100vw;
    
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #1F1D2B;
    &::before {
      content: "";
      position: absolute;
      width: 123px;
      height: 123px;
      left: 60%;
      top: 138px;
      filter: blur(90px);
      background-color: #FB37FF;
    }
    &::after {
      content: "";
      position: absolute;
      width: 123px;
      height: 123px;
      left: 80%;
      top: 550px;
      background-color: #18B2DE;
      filter: blur(80px);
    }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
      width: 100%;
    }
    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 80px;
    }
    .auction {
      margin-top: 100px;
    }
    .discover {
      display: flex;
      flex-direction: column;
    }
    .footer {
      margin: 50px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .footer2 {
      display: flex;
      justify-content: space-between;
      padding-bottom: 30px;
      border-top: 1px solid #F2F2F2;
    }
  }
  
  .navbar {
    .hamburgerlogowrap {
      display: flex;
      align-items: center;
    }
    .hamburger {
      display: none;
      color: #D7D7D7;
      background-color: #1F1D2B;
      border: none;
      margin-right: 10px;
    }
    .createbtn {
      cursor: pointer;
      background-color: transparent;
      border: none;
      width: 126px;
      height: 45px;
      color: #BCBCBC;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      &.selectedbtn {
        border: 1px solid #D7D7D7;
        border-radius: 10px;
      }
    }
    .navlogo {
      height: 100%;
      background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
    }
    .navlink {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      color: #BCBCBC;
      &.selectedlink {
        background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
        border-bottom: 1.5px solid #9B51E0;
      }
      &:not(:last-child) {
        margin-right: 32px;
      }
    }
  }
  .box {
    .infobox {
      animation-name: leftslide;
      animation-duration: 0.8s;
      max-height: 500px;
      max-width: 55%;
      overflow: hidden;
      &-boldtext {
        margin: 0;
        font-family: Poppins;
        color: #FFFFFF;
        font-size: 65px;
        font-weight: 600;
        line-height: 60px;
        letter-spacing: -2px;
        text-align: left;
      }
      &-slimtext {
        margin: 24px 0;
        font-family: Poppins;
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0.5px;
        text-align: left;
      }
      &-btnwrapper {
        display: flex;
      }
      &-explorebtn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1F1D2B;
        padding: 8px 38px;
        border-radius: 16px;
        
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        letter-spacing: -1px;
        color: #FFFFFF;
      }
      &-createbtn {
        cursor: pointer;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        padding: 8px 38px;
        border: 1px solid #D7D7D7;
        border-radius: 16px;
        
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        letter-spacing: -1px;
        color: #FFFFFF;
      }
      .selected {
        border: none;
        background: linear-gradient(103.91deg, #9B51E0 21.01%, rgba(48, 129, 237, 0.8) 100%);
      }
    }
    .display {
      animation-name: rightslide;
      animation-duration: 0.8s;
      padding: 14px;
      border: 1px solid;
      background: linear-gradient(169.44deg, rgba(58, 129, 191, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%);
      border-radius: 35px;
      max-height: 450px;
      max-width: 50%;
      overflow: hidden;
      &-nft {
        object-fit: cover;
        flex-shrink: 0;
        width: 300px;
        height: 300px;
        border-radius: 20px;
      }
      
      .infowrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
      }
      
      .info {
        display: flex;
        align-items: center;
        font-family: 'Poppins';
        font-style: normal;
        color: #FFFFFF;
        font-weight: 600;
        font-size: 12px;
        p {
          margin: 0;
        }
        &-img {
          object-fit: cover;
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .info2 {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-family: 'Poppins';
        color: #FFFFFF;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        p {
          margin: 0;
        }
        .iconwrapper {
          display: flex;
          align-items: center;
          svg {
            margin-right: 5px;
          }
        }
      }
    }
  }
  .auction {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 50px;
      .titlebold {
        margin: 0;
        font-family: 'Poppins';
        font-style: normal;
        color: #FFFFFF;
        font-weight: 500;
        font-size: 48px;
        line-height: 72px;
      }
      .titleslim {
        margin: 0;
        font-family: 'Poppins';
        font-style: normal;
        color: #D7D7D7;
        font-weight: 600;
        font-size: 18px;
        line-height: 36px;
        letter-spacing: -1px;
      }
    }
    .nft {
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-row-gap: 20px;
      grid-column-gap: 20px;
      justify-content: space-between;
    }
  }
  .started {
    // margin-top: 100px;
    display: flex;
    flex-direction: column;
    &-boldtext {
      margin: 0;
      align-self: center;
      font-family: "Poppins";
      font-style: normal;
      color: #FFFFFF;
      font-weight: 500;
      font-size: 40px;
      line-height: 72px;
    }
    &-slimtext {
      margin: 0;
      align-self: center;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 36px;
      letter-spacing: 0.5px;
      color: #E2E2E2;
    }
    &-items {
      padding: 60px 80px;
      position: relative;
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      justify-content: space-between;
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100px;
        top: 80px;
        filter: blur(80px);
        background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);
      }
      .itemwrapper {
        p {
          width: 100px;
          margin: 0;
          margin-top: 10px;
          text-align: center;
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #FFFFFF;
        }
      }
      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border-radius: 18px;
        background-color: red;
        background: rgba(255, 255, 255, 0.095);
        box-shadow: inset 2.01px -2.01px 20px rgba(214, 214, 214, 0.17), inset -3.01333px 3.01333px 3.01333px rgba(255, 255, 255, 0.39);
        backdrop-filter: blur(74.4293px);
      }
    }
  }
  .discover {
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        letter-spacing: -1px;
        color: #FFFFFF;
      }
    }
    &-items {
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-row-gap: 20px;
      grid-column-gap: 20px;
      justify-content: space-between;
    }
    &-loadbtn {
      cursor: pointer;
      margin-top: 20px;
      align-self: center;
      width: 161px;
      height: 40px;
      border: 1px solid #D7D7D7;
      border-radius: 10px;
      background-color: transparent;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      letter-spacing: 1.5px;
      color: #BCBCBC;
    }
  }
  .footer {
    &-main {
      max-width: 40%;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 30px;
      line-height: 40px;
      color: #FFFFFF;
    }
    &-navigate {
      display: flex;
      .nav {
        margin-left: 60px;
        display: flex; 
        flex-direction: column;

        h5 {
          margin: 0;
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 30px;
          color: #FFFFFF;
        }
        p {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0.03em;
          color: #D7D7D7;
        }
      }
    }
  }
  .footer2 {
    p {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 36px;
      color: #828282;
    }
  }
  
  .item {
    display: flex;
    flex-direction: column;
    justify-self: center;
    &-img {
      object-fit: cover;
      flex-shrink: 0;
      width: 200px;
      height: 220px;
      border-radius: 10px;
      transition: .3s;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
      }
    }
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid white;
      
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 24px;
      color: #FFFFFF;
    }
    &-date {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 24px;
      color: #BCBCBC;
    }
  }
  .filters {
    display: flex;
    align-items: center;
    .filter {
      display: flex;
      align-items: center;
      margin-right: 30px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      color: #FFFFFF;
      svg {
        margin-right: 5px;
        margin-left: 5px;
      }
    }
    .filterbtn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 30px;
      background: linear-gradient(93.51deg, #9B51E0 2.84%, #3081ED 99.18%);
      border: none;
      border-radius: 10px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      color: #FFFFFF;
      svg {
        margin-right: 5px;
      }
    }
  }
  
  
  
  @media screen and (max-width: 1500px) {
   .landingpage {
    max-width: 100vw;
   }
  }
  
  @media screen and (max-width: 1040px) {
    .box {
      flex-direction: column;
      .infobox {
        max-height: 450px;
        max-width: none;
        margin-bottom: 50px;
      }
      .display {
        display: none;
        max-height: none;
        max-width: none;
      }
    }
    .auction {
      .nft {
        grid-template-columns: auto auto;
        justify-content: space-around;
      }
    }
    .discover-items {
      grid-template-columns: auto auto auto;
      justify-content: space-around;
    }
    .footer {
      flex-direction: column;
      &-main {
        max-width: 80%;
        margin-bottom: 50px;
        text-align: center;
      }
      &-navigate {
        .nav {
          &:first-child {
            margin: 0;
          }
        }
      }
    }
  }
  
  @media screen and (max-width: 925px) {
    .navlinkwrap {
      display: none;
    }
    .buttonwrap {
      display: none;
    }
    .hamburger {
      display: flex !important;
      align-items: center;
    }
    .started-slimtext {
      text-align: center;
    }
  }
  
  @media screen and (max-width: 825px) {
    .started-items {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: space-evenly;
      padding: 50px 0;
      &:before {
        height: 200px;
        top: 90px;
        filter: blur(120px);
      }
    }
    
    .discover-items {
      grid-template-columns: auto auto;
      justify-content: space-around;
    }
  }
  
  @media screen and (max-width: 700px) {
    .box {
      flex-direction: column;
      .infobox {
        max-height: none;
        max-width: none;
        margin-bottom: 50px;
      }
      .display {
        display: block;
        max-height: none;
        max-width: none;
      }
    }
    
    .discover-title {
      justify-content: center;
      .filters {
        display: none;
      }
    }
    .auction{
      .title {
        justify-content: center;
        .titleslim {
          display: none;
        }
      }
    }
  }
  
  @media screen and (max-width: 600px) {
    .landingpage {
      padding: 0 20px;
    }
    
    .box {
      .infobox {
        &-boldtext {
          font-size: 45px;
          line-height: 50px;
        }
        &-slimtext {
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
    .discover-items {
      grid-template-columns: auto;
      justify-content: space-around;
    }
    .auction {
      .nft {
        grid-template-columns: auto;
        justify-content: space-around;
      }
    }
    .footer-main {
      font-size: 20px;
      line-height: 30px;
      max-width: 100%;
      margin-bottom: 50px;
      text-align: center;
    }
    .footer-navigate {
      justify-content: space-between;
      width: 100%;
      .nav {
        margin-left: 20px;
        h5 {
          font-size: 15px;
          line-height: 30px;
        }
        p {
          font-size: 10px;
          line-height: 18px;
        }
      }
    }
  }
  
  @media screen and (max-width: 480px) {
    .landingpage{
      .box {
        .infobox {
          &-boldtext {
            font-size: 32px;
            line-height: 1.4em;
            text-align: center;
          }
          &-slimtext {
            text-align: center;
          }
          &-btnwrapper {
            justify-content: center;
          }
        }
      }
    }
  }
  
  @keyframes leftslide {
    from {transform: translateX(-700px);}
    to {transform: translateX(0px);}
  }
  
  @keyframes rightslide {
    from {transform: translateX(550px);}
    to {transform: translateX(0px);}
  }

`;


export default Landing
