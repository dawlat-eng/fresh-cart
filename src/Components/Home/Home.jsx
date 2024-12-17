import React, { useContext, useEffect, useState } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import Mainslider from '../Mainslider/Mainslider';
import { Helmet } from 'react-helmet';

export default function Home() {
  return <>
  <Helmet>
     <title>Fresh Cart-Home</title>
  </Helmet>
  <Mainslider/>
  <CategorySlider/>
  <RecentProducts/>
 


  </>
}
