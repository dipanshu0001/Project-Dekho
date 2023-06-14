import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel_card.css'
import Carousel_card from './Carousel_card';
import { useFunction } from '../../Common_function_context/ContextProvide';




function Like_carousel() {
    const projects = useSelector(state => state.ProjectReducers.payload)
    const { Projectcounter } = useFunction()
    const [mostlike, setMostLiked] = useState([]);

    const state = {
        items: [
            { id: 1, title: 'Browse By Categories', img: require('../../image/p1.png') },
            { id: 2, title: 'Read Blogs', img: require('../../image/p2.png') },
            { id: 3, title: 'Add Your Projects', img: require('../../image/p3.png') },
            // { id: 4, title: 'item #4', img: require('../../image/p1.png') },
            // { id: 5, title: 'item #5', img: require('../../image/p1.png') }
        ]
    }
    useEffect(() => {
        const getMostLiked = async () => {
            try {
                const response = await axios.get('http://localhost:4000/Api/Projects/MostLiked');
                const data = response.data;
                //   data.map(ele=>setMostLiked(prev=>[...prev,ele]))
                // console.log(data)
                setMostLiked(data);
                // console.log(mostlike)
            } catch (err) {
                console.log(err.message);
            }
        };
        getMostLiked();
        console.log(mostlike)
    }, [Projectcounter])
    const settings = {
        dots: false,

        infinite: true,
        autoplay: true,
        arrows: false,
        mobileFirst: true,
        speed: 500,
        autoplaySpeed: 1500,
        // cssEase: "linear",
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        className: 'slides',
        // responsive: [
        //   {
        //     breakpoint: 800,
        //     settings: {
        //       slidesToShow: 1,
        //       slidesToScroll: 1,
        //       arrows: true,
        //     }
        //   },
        //   {
        //     breakpoint: 900,
        //     settings: {
        //       slidesToShow: 1,
        //       slidesToScroll: 1,
        //       initialSlide: 0,
        //     }
        //   },
        //   {
        //     breakpoint: 1200,
        //     settings: {
        //       slidesToShow: 1,
        //       slidesToScroll: 1,
        //       dots: true,
        //     }
        //   },
        // ],
    };
    const css = {
        display: "flex",
        /* justify-content: space-evenly; */
        width: "80%",
        flexWrap: "nowrap",
        margin: "0px auto",
        padding: "20px",
        /* overflow: hidden; */
        flexDirection: "column"
    }
    return (
        <div className='outer-main'>
        {/* <> */}
        <h3 style={{fontFamily: "Poppins", fontStyle: "normal", color: "rgb(255, 255, 255)", fontWeight: "500", fontSize: "48px", lineHeight: "72px" }}>Top Liked Projects</h3>

            <Slider {...settings}>
                {
                    mostlike.length>0 && mostlike.map((Project, index) =>(
                        <Carousel_card {...Project.originalFields} key={index} />
                    ))
                }

            </Slider>
        {/* </> */ }
        </div >
    )
}

export default Like_carousel