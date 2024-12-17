import React, { useContext,useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Payment() {
  const [count, setcount] = useState(0)
  const [isOnline, setisOnline] = useState(false)
  let navigate= useNavigate()
 
 let {cardId , allProducts , setallProducts , setnumOfItems , settotalPrice }= useContext(CartContext)

 
 async function cashOrder(val){
    // console.log(val);
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}` , {
    //backend want details in shippingaddress
      shippingAddress:val
    } , {
      headers:{
        token:localStorage.getItem('userToken')
      }
    })
    if(data.status=='success'){
      toast.success('product will come sooon....')
      //handle not to make reload we can handle more by make a message instead of empty table
       setnumOfItems(null)
       settotalPrice (null)
       setallProducts(null)
       //yrg3 yla2y el cart fadya
      navigate('/cart')

    }
    // console.log(data);
  }

async function payOnline(val){
  //url need id and domain
let {data}= await  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:5173` , {
    shippingAddress: val
  } , {
    headers:{
      token:localStorage.getItem('userToken')
    }
  })
  
  if(data.status=='success'  ){
    //open anothertap with this pay url
    window.open(data.session.url)
    //paymentgateway url
    // console.log(data.session.url);
  }
}

function detectPayment(val){
 if(isOnline){
  payOnline(val)
 }
 else{
  cashOrder()
 }
}

  let formik= useFormik({
    initialValues:{
      details: "",
        phone:"",
        city:"",
       
    } ,
    
    onSubmit: detectPayment
  
  })
  
  return <>
  <Helmet>
     <title>Fresh Cart-Payment</title>
  </Helmet>
  <h2 className='text-green-600 py-5 text-2xl font-bold'>Pay Now....</h2>

  <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

    <div className="relative z-0 w-full my-5 group">
        <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your details</label>
    </div>

    <div className="relative z-0 w-full my-5 group">
        <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
    </div>

    <div className="relative z-0 w-full my-5 group">
        <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your City</label>
    </div>

    <button onClick={()=>{setisOnline(false)}} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Pay Cash   </button>
    <button onClick={()=>{setisOnline(true)}} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Pay Online   </button>

  </form>
  
  </>
}

