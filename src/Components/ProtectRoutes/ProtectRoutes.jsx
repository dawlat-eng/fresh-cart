import React, {useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRoutes(props) {
    const [count, setcount] = useState(0)

    if(localStorage.getItem('userToken')!==null){
      
      return  props.children  
    }
    else{ 
     return <Navigate to='/signin'/>
    }

  return  <> 
  </>
}
