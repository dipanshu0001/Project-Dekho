import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css'


function Carousel() {
    const state = {
        items: [
            { id: 1, title: 'Browse By Categories', img: require('../../image/p1.png') },
            { id: 2, title: 'Read Blogs', img: require('../../image/p2.png') },
            { id: 3, title: 'Add Your Projects', img: require('../../image/p3.png') },
            // { id: 4, title: 'item #4', img: require('../../image/p1.png') },
            // { id: 5, title: 'item #5', img: require('../../image/p1.png') }
        ]
    }
    const settings = {
        dots: false,

        infinite: true,
        autoplay: true,
        arrows: false,
        mobileFirst: true,
        speed: 500,
        autoplaySpeed: 1500,
        cssEase: "linear",
        slidesToShow: 1,
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
    return (
        <div className='carousel-main'>
            <Slider {...settings}>
                {state.items.map((item,index) =>
                    <span key={index}>
                        <div className="item-main" >
                            <div className='image-div'>
                                <img src={item.img} />
                            </div>
                        </div>
                        <div className='content-main'>
                            <h1>{item.title}</h1>
                            {/* <small>xyz kuch bhi hai abhi ke liye</small> */}
                        </div>
                    </span>

                )}
            </Slider>
        </div>
    )
}

export default Carousel