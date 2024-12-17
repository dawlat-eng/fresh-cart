import React, { useState } from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Toaster } from 'react-hot-toast';


export default function Layout() {
const [count, setcount] = useState(0)

  return <>
    
      <Navbar/>
      {/*routing*/}
      <div className="container px-8 m-auto py-16">
      <Outlet/>
      <Toaster/>
      </div>
      
      <Footer/>
    
  </>
}
