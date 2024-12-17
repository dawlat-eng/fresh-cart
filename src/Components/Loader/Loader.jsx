import React, {useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'

export default function Loader() {
    const [count, setcount] = useState(0)

    
  return <>

  <div className="flex justify-center items-center h-screen">
  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
  </div>
  
  
  </>
}
