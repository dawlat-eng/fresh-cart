//libraries
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Offline } from 'react-detect-offline';

// Contexts
import UserContextProvider from './context/UserContext';
import CartContextProvider from './context/CartContext';

// Components
import Layout from './Components/Layout/Layout';
import ProtectRoutes from './Components/ProtectRoutes/ProtectRoutes';
import Notfound from './Components/Notfound/Notfound';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import AllOrders from './Components/AllOrders/AllOrders';
import Payment from './Components/Payment/Payment';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Wishlist from './Components/Wish-list/Wishlist';
import ForgotPassword from './Components/Forgotpassword/ForgotPassword';
import ResetPassword from './Components/Resetpassword/ResetPassword';
import SubCategories from './Components/SubCategories/SubCategories';
// Styles
import './App.css';

let query= new QueryClient()

// routes
const routes = createBrowserRouter([
  {
    path: '/', 
    element: <Layout />,
    children: [
      {index:true , element:<ProtectRoutes><Home/></ProtectRoutes>},
      {path:'products' , element:<ProtectRoutes><Products/></ProtectRoutes>},
      // {path:'products/:cid' , element:<ProtectRoutes><Products/></ProtectRoutes>},
      {path:'cart' , element:<ProtectRoutes><Cart/></ProtectRoutes>},
      {path:'payment' , element:<ProtectRoutes><Payment/></ProtectRoutes>},
      {path:'allorders' , element:<ProtectRoutes><AllOrders/></ProtectRoutes>},
      //paramter to show in url and send it to api
      {path:'productDetails/:id/:category' , element:<ProtectRoutes><ProductDetails/></ProtectRoutes>},
      {path:'brands' , element:<ProtectRoutes><Brands/></ProtectRoutes>},
      {path:'categories' , element:<ProtectRoutes><Categories/></ProtectRoutes>},
      {path:'subcategories/:id' , element:<ProtectRoutes><SubCategories/></ProtectRoutes>},
      {path:'Wishlist' , element:<ProtectRoutes><Wishlist/></ProtectRoutes>},
      {path:'signin' , element:<Signin/>},
      {path:'signup' , element:<Signup/>},
      {path:'forgot-password' , element:<ForgotPassword/>},
      {path:'resetpassword' , element:<ResetPassword/>},
      {path:'*' , element:<Notfound/>}
    ]},
]);

function App() {
  const [count, setCount] = useState(0);

  return <>
  <QueryClientProvider client={query}>
    <CartContextProvider>
            <UserContextProvider>

              {/* app */}
              <RouterProvider router={routes} />
              <ReactQueryDevtools/>
              <div className="fixed bottom-0 start-2 rounded shadow-md">
                  <Offline>You are offline (surprise!)</Offline>
              </div>
              
            </UserContextProvider>    
      </CartContextProvider>
  </QueryClientProvider>
  
  
  </>
    
}

export default App;
