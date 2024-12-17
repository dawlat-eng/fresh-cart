import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

export function useWishlist() {
  const { userLogin } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 
  function fetchWishlist() {
    if (userLogin) {
      axios
        .get('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers: {
            token: `${userLogin}`,
          },
        })
        .then((response) => {
          setWishlist(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching wishlist:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  // Add 
  function addToWishlist(product) {
    let productId= product._id;
    axios
      .post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',{ productId },
        {
          headers: {
            token: `${userLogin}`,
          },
        }
      )
      .then((response) => {
         setWishlist((prevWishlist) => [...prevWishlist, product]);
        //or this so send prod id to func. setWishlist((prevWishlist) => [...prevWishlist, {_id: productId}]);
      })
      .catch((error) => {
        console.error('Error adding to wishlist:', error);
      });
  }

  // Remove 
  function removeFromWishlist(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: `${userLogin}`,
        },
      })
      .then(() => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));
      })
      .catch((error) => {
        console.error('Error removing from wishlist:', error);
      });
  }

  // Check 
  function isInWishlist(productId) {
    return wishlist.some((item) => item._id === productId);
  }

  useEffect(() => {
    fetchWishlist();
  }, [userLogin]);

  return { wishlist, isLoading, addToWishlist, removeFromWishlist, isInWishlist };
}
