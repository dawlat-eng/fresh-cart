import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import axios from 'axios';

export default function Brands() {

  function getAllBrands(){
    return  axios.get( `https://ecommerce.routemisr.com/api/v1/brands`)
 }


let {data , isError , error , isFetching , isLoading} =useQuery({
  queryKey:['getBrands'], 
  queryFn: getAllBrands
});
 
 if (isLoading){
    return <Loader/>
  }
  if (isError){
    return <h2>there is an error{error.message}</h2>
  }

  return<>
  <div className="py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {data?.data?.data?.map((brand) => (
    <div 
      key={brand._id} 
      className="group bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      <img 
        src={brand.image} 
        className="w-full h-48 object-cover transition-transform transform group-hover:scale-110" 
        alt={brand.name} 
      />
      <div className="p-4">
        <h3 className="text-center text-lg font-semibold text-gray-700 group-hover:text-green-600">
          {brand.name}
        </h3>
      </div>
    </div>
  ))}
</div>

   <Helmet>
    <title>Fresh Cart-Brands</title>
   </Helmet>
  </>
}
