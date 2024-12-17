import React, { useContext } from 'react';
import { useWishlist } from '../Hooks/Usewhishlist';
import toast from 'react-hot-toast';
import { CartContext } from '../../context/CartContext';



export default function Wishlist() {
  const { wishlist, isLoading, removeFromWishlist } = useWishlist();
  const { addToCart } = useContext(CartContext);
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-10 px-6">
      <h2 className="text-2xl font-semibold mb-5">Your Wishlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {wishlist.map((prod) => (
          <div key={prod._id} className="product group border rounded-lg shadow-md overflow-hidden relative">
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
              </div>
            </div><div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => handleAddToCart(prod._id)}
                  className="btn py-1 px-4 rounded-md hover:bg-green-800 transition-all"
                >
                  Add To Cart
                </button>
              </div>

            <div
              className="absolute top-2 right-2 text-xl cursor-pointer text-red-600"
              onClick={() => removeFromWishlist(prod._id)}
            >
              <i className="fa-solid fa-heart"></i>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
