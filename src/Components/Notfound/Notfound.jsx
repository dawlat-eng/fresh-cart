import React from 'react';
import { Link } from 'react-router-dom'; 
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return <>
  <Helmet>
     <title>Fresh Cart-Notfound page</title>
  </Helmet>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 mt-4">Oops! Page not found.</p>
        <p className="text-lg text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Go Home
        </Link>
      </div>
    </div>
  </>
}
