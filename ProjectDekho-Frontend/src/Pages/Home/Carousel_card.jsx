import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from 'axios'
import { useFunction } from '../../Common_function_context/ContextProvide';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const Carousel_card = ({ Image, Name, Uid, Monetized, Industry, Maxprice, _id }) => {
    const [userdata, setData] = useState({})
    const userstate = useSelector(state => state.UserReducer)
    const navigate = useNavigate();
    const { setProjectcounter } = useFunction()
    useEffect(() => {
        const getData = async () => {
            const userresult = await axios.post("http://localhost:4000/Api/User/Get_User", { uid: Uid })
            // console.log(userresult)
            setData(prev => ({ ...prev, ...userresult.data.user }))
        }
        getData()
    }, [])
    const HandleviewDetail = async () => {
        try {
            const update_count = await axios.post('http://localhost:4000/Api/Projects/Viewcount', { user_id: userstate.Uid, _id })
            // console.log(update_count.data)
            //   setviewedcount(update_count.data.new_list_length)
            navigate(`/Project/${_id}/${Uid}`)
            setProjectcounter(prev => prev + 1)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            {/* <div className='carousel_card p-4' style={{ width: "85%", height: "fit-content" }}>
                <img className='image_border_setter' src={Image} style={{ height: "150px", width: "100%", PADDING: "10px" }} />
                <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '2vh', padding: '1.5vh', borderStyle: 'solid', borderBottomWidth: '2px' }}>
                    <img style={{ marginRight: '2vw' }}
                        src={userdata.ProfileImage}
                        alt="Avatar" className="avatar" />
                    <div className='text' style={{ marginTop: '1vh' }}>{userdata.Username}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div className="heading_card" style={{ height: '8vh', padding: '0 1vw', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{Name}</div>

                </div>
                 <div className="heading_card" style={{ display: 'flex', justifyContent: 'space-between', padding: '0vh 2vw', margin: '1vh', borderStyle: 'solid', borderBottomWidth: '2px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                        <div style={{ height: '5vh', padding: '0 1vw', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Monetized</div>
                        <div style={{ height: '5vh', padding: '0 1vw', fontWeight: '1vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{Monetized ? "Yes" : "No"}</div>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', }}>
                        <div style={{ height: '5vh', padding: '0 1vw', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Industry</div>
                        <div style={{ height: '5vh', padding: '0 1vw', fontWeight: '1vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{Industry}</div>

                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: "center" }}>
                    <div style={{ marginTop: '1vh', fontSize: '1.2vw', fontWeight: 'revert' }}>
                        <span>{Maxprice}</span>
                        <CurrencyRupeeIcon style={{ fontSize: '1.2vw' }} />
                    </div>
                    <div style={{ marginTop: '1vh' }}>
                        <Button size="small" onClick={HandleviewDetail}>view More</Button>
                    </div>

                </div>



            </div> */}


            <CardCont>
            <div class="card">
                <div class="card__img-wrapper">
                    <img class="card__img" src={Image ? Image : "https://images.unsplash.com/photo-1617791160588-241658c0f566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODYyMjQ0ODd8&ixlib=rb-4.0.3&q=80&w=400"} alt="" />
                </div>
                <div class="card__content">
                    <h3>{Name}</h3>
                    <p>{Industry}</p>
                    <a href="#" onClick={HandleviewDetail} class="button">View more</a>
                </div>
            </div>
            </CardCont>
        </>
    )
}


const CardCont = styled.div`



body {
    font-family: 'Rubik', sans-serif;
    margin: 0;
    background-color: #f1f1f1;
    font-size: 1rem;
    padding-block: 2rem;
  }
  
  ul:where([role="list"]) {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  img {
    max-width: 100%;
    display: block;
  }
  
  section {
    padding-block: clamp(2rem, 5vw, 3rem);
  }
  
  button,
  input,
  select,
  textarea {
    font: inherit;
  }
  
  svg {
    height: 2.5ex;
    width: auto;
    flex: none;
    fill: currentColor;
  }
  
  .container {
    width: min(100% - 2rem, 63em);
    margin-inline: auto;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  
  .section-header * {
    margin: 0;
  }
  
  .section-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }
  
  .cards {
    display: grid;
    grid-template-columns: 
      repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
    gap: 1.5rem;
    padding-block: 1.5rem;
  }
  
  .cards[data-layout="list"] {
    grid-template-columns: 1fr;
  }
  
  .card {
    width: min(100%, 20rem);
    margin-inline: auto;
    background-color: #fff;
    border-radius: 0.5em;
    overflow: hidden;
    box-shadow: 1.95px 1.95px 2.6px rgba(0, 0, 0, 0.2);
  }
  
  .card__content {
    display: grid;
    gap: 1rem;
    padding: 1rem;
  }
  
  .cards[data-layout="list"] .card {
    width: 100%;
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: stretch;
  }
  
  .cards[data-layout="list"] .card__content {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    justify-content: space-between;
  }
  
  @media (width < 40em) {
    .cards[data-layout="list"] .card {
      grid-template-columns: 1fr 3fr;
    }
    
    .cards[data-layout="list"] .card__content {
      grid-template-columns: 1fr;
    }
  }
  
  .card * {
    margin: 0;
  }
  
  .card__img-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }
  
  .card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card__content h3 {
    text-transform: capitalize;
  }
  
  .button-group {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
  
  .button-group--collapse {
    gap: 0;
    border-radius: 0.25em;
    overflow: hidden;
    width: fit-content;
  }
  
  .button-group--collapse > .button {
    border-radius: 0;
  }
  
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    padding: 0.5em 1.5em;
    border-radius: 0.25em;
    border: 0;
    
    text-decoration: none;
    background-color: #1b2435;
    color: #fff;
    transition: background-color 250ms ease;
  }
  
  .button:is(:hover, :focus-visible) {
    background-color: #8600bb;
    color: #fff;
  }
  
  .button:active {
    scale: 0.97;
  }
  
  .button--icon-only {
    padding: 0.5em;
    background-color: #fff;
    color: #1b2435;
  }
  
  .button.active {
    background-color: #8600bb;
    color: #fff;
  }

`;


export default Carousel_card