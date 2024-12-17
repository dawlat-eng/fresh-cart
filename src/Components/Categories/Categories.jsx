import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Categories() {
  function getAllCategories(){
    return  axios.get( `https://ecommerce.routemisr.com/api/v1/categories`)
 }
 let {data , isError , error , isFetching , isLoading} =useQuery({
  queryKey:['getCategories'], 
  queryFn: getAllCategories
});
 
 if (isLoading){
    return <Loader/>
  }
  if (isError){
    return <h2>there is an error{error.message}</h2>
  }

  return<>
      <div className="py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {data?.data?.data?.map((category) => (
          <Link
            to={`/subcategories/${category._id}`} 
            key={category._id}
            className="group bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[300px] object-cover rounded-md transition-transform transform group-hover:scale-110"/>
            <h3 className="mt-4 text-xl text-green-600 font-bold text-center transition-colors group-hover:text-green-800">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
   

  <Helmet>
  <title>Fresh Cart-Categories</title>
  
 </Helmet>
    
    </>
}
