import React, { useState } from 'react';
import Slider from 'react-slick';
import slide1 from '../../images/slider-2.jpeg';
import slide4 from '../../images/grocery-banner-2.jpeg';
import slide5 from '../../images/grocery-banner.png';
import slide2 from '../../images/slider-image-2.jpeg';
import slide3 from '../../images/slider-image-3.jpeg';

export default function Mainslider() {
  const [count, setcount] = useState(0);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 py-4 gap-6">
        <div className="col-span-2">
          <Slider {...settings}>
            <img className="h-[400px] w-full object-cover" src={slide1} alt="" />
            <img className="h-[400px] w-full object-cover" src={slide4} alt="" />
            <img className="h-[400px] w-full object-cover" src={slide5} alt="" />
          </Slider>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <img className="h-[200px] w-full object-cover" src={slide2} alt="" />
          <img className="h-[200px] w-full object-cover" src={slide3} alt="" />
        </div>
      </div>
    </>
  );
}
