import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

export default function CategorySlider() {
  const [categoryProd, setcategoryProd] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function getProducts() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setcategoryProd(data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Slider {...settings}>
        {categoryProd.map((catg) => (
          <div key={catg._id} className="grid grid-cols-1 gap-2 items-center justify-center">
            <img
              src={catg.image}
              className="h-[200px] w-full object-cover rounded-md"
              alt={catg.name}
            />
            <h3 className="text-center mt-2">{catg.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
