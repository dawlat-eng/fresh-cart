import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
  

export default function SubCategories() {
    const { id } = useParams();
    const [subcategories, setSubcategories] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    async function getSubCategories(){
        try{
            setIsLoading(true);
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
            setSubcategories(data.data)
        }catch{
            setError(err.message);
        }finally{
            setIsLoading(false);
        }
    }
  
    getSubCategories()
  }, [id]);
  
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h2 className="text-red-500">Error: {error}</h2>;
  }


  return <>
   <div className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-4">Subcategories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subcategories?.map((subcategory) => (
          <div
            key={subcategory._id}
            className="p-4 border rounded-lg shadow hover:shadow-md transition-all"
          >
            <h4 className="text-lg font-semibold text-gray-700">
              {subcategory.name}
            </h4>
            <p className="text-gray-500">
              <strong>Slug:</strong> {subcategory.slug}
            </p>
          </div>
        ))}
      </div>
    </div>
  
 <Helmet>
 
  <title>Fresh Cart-SubCategories</title>
 
 </Helmet>
  </>
}
