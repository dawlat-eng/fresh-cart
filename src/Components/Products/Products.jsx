import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Useproducts from '../Hooks/Useproducts';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { useWishlist } from '../Hooks/Usewhishlist';

export default function Products() {
  const { data, isError, isLoading } = Useproducts();
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');

  async function handleAddToWishlist(product) {
    try {
      addToWishlist(product);
      toast.success('Product added to wishlist successfully!', { position: 'top-right' });
    } catch (error) {
      toast.error('Error adding to wishlist.', { position: 'top-right' });
    }
  }

  async function handleRemoveFrmWishlist(productId) {
    try {
      removeFromWishlist(productId);
      toast.success('Product Removed from wishlist successfully!', { position: 'top-right' });
    } catch (error) {
      toast.error('Error Removing From wishlist.', { position: 'top-right' });
    }
  }

  async function handleAddToCart(id) {
    try {
      const { data } = await addToCart(id);
      if (data.status === 'success') {
        toast.success(data.message, { position: 'top-right' });
      } else {
        toast.error(data.message, { position: 'top-right' });
      }
    } catch (error) {
      toast.error('Error adding to cart.', { position: 'top-right' });
    }
  }

 
  const filteredProducts = data?.data?.data?.filter((prod) =>
    prod.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>There is an error</h2>;
  }

  return (
    <>
      <div className="py-10 px-6">
       
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-green-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredProducts?.map((prod) => (
            <div
              key={prod._id}
              className="product group border rounded-lg shadow-md overflow-hidden relative"
            >
              <Link to={`/productDetails/${prod._id}/${prod.category.name}`} className="block">
                <img
                  src={prod.imageCover}
                  className="w-full h-48 object-cover"
                  alt={prod.title}
                />
                <div className="p-4">
                  <span className="text-green-700 font-light">{prod.category.name}</span>
                  <h3 className="text-lg font-semibold mt-2">
                    {prod.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">{prod.price} EGP</span>
                    <span className="text-yellow-400">
                      15 <i className="fas fa-star"></i>
                    </span>
                  </div>
                </div>
              </Link>

              <div
                className={`absolute top-2 right-2 text-xl cursor-pointer ${
                  isInWishlist(prod._id) ? 'text-red-600' : 'text-gray-500'
                 }`}
                 onClick={() => {
                   isInWishlist(prod._id)
                     ? handleRemoveFrmWishlist(prod._id)
                     : handleAddToWishlist(prod);
                 }}
               >
                 <i className="fa-solid fa-heart"></i>
               </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => handleAddToCart(prod._id)}
                  className="btn py-1 px-4 rounded-md hover:bg-green-800 transition-all"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Helmet>
        <title>Fresh Cart - Products</title>
      </Helmet>
    </>
  );
}

