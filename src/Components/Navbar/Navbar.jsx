import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../images/imges1.svg';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';

export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { numOfItems } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // Logout func
  function logout() {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/signin');
  }

  return (
    <nav className='bg-gray-300 lg:fixed top-0 end-0 start-0 z-20 w-full'>
      <div className="p-3 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
       
        <div className="col-span-4 lg:col-span-2 flex justify-between items-center">
          <img width={130} src={logo} alt="Logo" />

          <button
            className="lg:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>

        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:col-span-8 flex-col lg:flex-row lg:items-center mt-4 lg:mt-0 space-y-4 lg:space-y-0 lg:space-x-6`}
        >
          {userLogin !== null ? (
            <ul className='flex flex-col lg:flex-row lg:items-center pl-0 lg:pl-8 space-y-4 lg:space-y-0 lg:space-x-4'>
              <li className='px-2 py-2 text-gray-800 hover:text-green-600'>
                <NavLink to='/'>Home</NavLink>
              </li>
              <li className='px-2 py-2 text-gray-800 hover:text-green-600'>
                <NavLink to='products'>Products</NavLink>
              </li>
              <li className='px-2 py-2 text-gray-800 hover:text-green-600'>
                <NavLink to='Wishlist'>Wish list</NavLink>
              </li>
              <li className='px-2 py-2 text-gray-800 hover:text-green-600'>
                <NavLink to='brands'>Brands</NavLink>
              </li>
              <li className='px-2 py-2 text-gray-800 hover:text-green-600'>
                <NavLink to='categories'>Categories</NavLink>
              </li>
              <li className='px-2 py-2 text-gray-800 hover:text-green-600'>
                <NavLink to='allorders'>All Orders</NavLink>
              </li>
              <li className='px-2 py-2 text-gray-800 hover:text-green-600 relative'>
                <NavLink to='cart'>
                  Cart{' '}
                  <span className="bg-red-100 text-red-800 absolute top-[-8px] end-[-25px] text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    {numOfItems}
                  </span>
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>

       
        <div className="flex col-span-4 lg:col-span-2 items-center justify-between mt-4 lg:mt-0 space-x-6">
          {userLogin == null ? (
            <>
              <NavLink to="/signup" className="text-gray-800 hover:text-green-600">
                Register
              </NavLink>
              <NavLink to="/signin" className="text-gray-800 hover:text-green-600">
                Login
              </NavLink>
            </>
          ) : (
            <button onClick={logout} className="text-gray-800 hover:text-green-600">
              Logout
            </button>
          )}

          <div className="flex space-x-3">
            <i className="fab fa-facebook text-xl text-gray-800 hover:text-blue-600"></i>
            <i className="fab fa-instagram text-xl text-gray-800 hover:text-pink-600"></i>
            <i className="fab fa-tiktok text-xl text-gray-800 hover:text-black"></i>
            <i className="fab fa-youtube text-xl text-gray-800 hover:text-red-600"></i>
          </div>
        </div>
      </div>
    </nav>
  );
}
