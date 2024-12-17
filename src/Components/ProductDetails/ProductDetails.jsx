import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';


export default function ProductDetails() {
let {addToCart} =  useContext(CartContext)

async function addProducToCart(id){
  let {data}=  await addToCart(id)

  console.log(data);
  if(data.status=='success'){
    toast.success(data.message , {
      position: "top-right",
      
    })
    
  }
  else{
    toast.error(data.message , {
      position: "top-right",
      
    })
    
  }
  
}

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
 let {id , category}= useParams()  
 
    const [deatils, setDeatils] = useState(null) 
    const [categoryProd, setcategoryProd] = useState(null)


  async  function productDeatils(){
      let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setDeatils(data.data)
    }

    async function getProductsCategory(){
      let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      console.log('all Prod'  , data.data);
      let newArr= data.data.filter((prod)=>{ return prod.category.name == category }) 
     
      setcategoryProd(newArr)
      }
    
    useEffect(()=>{
      productDeatils()
      getProductsCategory()
    } , [id ,category])

    
  return <>
 {deatils ?  <div className="flex flex-wrap py-8 items-center">

<div className="w-1/4 px-5">
    
    <Slider {...settings}>
      
      {deatils.images.map((srcImg , index)=>{return  <img key={index}  src={srcImg}  className='w-full' alt="" />})}
    

    </Slider>
</div>

    <div className="w-2/4 px-4">
    <div className='product'>
    <h3 className='text-4xl text-gray-700 my-4 font-bold'>{deatils?.title.split(' ').slice(0,2).join(' ')}</h3>
    <p className='text-gray-500'>{deatils.description}</p>
    <span className='text-green-700 font-light'>{deatils?.category.name}</span>
    <div className="flex justify-between">
      <span>{deatils?.price} EGP</span>
      <span> {deatils?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
    </div>
    <button  onClick={()=>{addProducToCart(deatils._id)}}   className='btn'>Add To Cart</button>
  </div>
</div>
</div>: <Loader/>}
  

  <div className="flex flex-wrap mt-5 py-5">

  {categoryProd?.map((prod)=>{ return  <div key={prod.id} className='w-full sm:w-1/3 md:w-1/4 lg:w-1/6'>
    <div  className=" product px-6 py-10 group  ">
  <Link  to={`/productDetails/${prod.id}/${prod?.category?.name}`}>
  <img src={prod.imageCover} className='w-full' alt="" />
    <span className='text-green-700 font-light'>{prod?.category?.name}</span>
    <h3 className='text-xl font-normal'>{prod.title.split(' ').slice(0,2).join(' ')}</h3>
    <div className="flex justify-between">
      <span>{prod?.price} EGP</span>
      <span>15 <i className='fas fa-star text-yellow-300'></i></span>
    </div>
  </Link>
  <button  onClick={()=>{addProducToCart(deatils._id)}}   className='btn'>Add To Cart</button>


  </div>
  </div> })}

  </div>
  
  </>
}
