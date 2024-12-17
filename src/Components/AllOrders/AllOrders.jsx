import axios from 'axios';
import React  from 'react';
import { Helmet } from 'react-helmet';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';


export default function AllOrders() {
   function getAllOrders(){
      return axios.get('https://ecommerce.routemisr.com/api/v1/orders/')
    }
   
    let {data , isError , error , isFetching , isLoading} =useQuery({
      queryKey:['getAllOrders'], 
      queryFn: getAllOrders
    });

    
    if (isLoading){
      return <Loader/>
    }
    if (isError){
      return <h2>there is an error{error.message}</h2>
    }
    
  return <>
 <div className="py-10 px-6">
        <h2 className="text-2xl font-bold mb-6">All Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.data?.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow-md p-4 bg-white">
              {/* Order Details */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Order #{order.id}
                </h3>
                <p>
                  <strong>Total Price:</strong> {order.totalOrderPrice} EGP
                </p>
                <p>
                  <strong>Payment Method:</strong>{' '}
                  {order.paymentMethodType}
                </p>
                <p>
                  <strong>Paid:</strong>{' '}
                  {order.isPaid ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>Delivered:</strong>{' '}
                  {order.isDelivered ? 'Yes' : 'No'}
                </p>
              </div>

              {/* User Info */}
              <div className="mb-4">
                <h4 className="font-bold">User Info:</h4>
                <p>Name: {order.user.name}</p>
                <p>Email: {order.user.email}</p>
                <p>Phone: {order.user.phone}</p>
              </div>

              {/* Cart Items */}
              <div>
                <h4 className="font-bold">Cart Items:</h4>
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="border rounded-lg p-2 mb-2 flex">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-md mr-4"/>
                    <div>
                      <h5 className="text-sm font-medium">
                        {item.product.title}
                      </h5>
                      <p>
                        <strong>Price:</strong> {item.price} EGP
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.count}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    <Helmet>
        <title>Fresh Cart-All orders</title>
   </Helmet>
    </>
}
