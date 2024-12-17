import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const CartContext= createContext()

export default function CartContextProvider(props) {
    const [totalPrice, settotalPrice] = useState(0)
    const [cardId, setcardId] = useState(0)
    const [numOfItems, setnumOfItems] = useState(0)
    const [allProducts, setallProducts] = useState(null)

let headers={
    token:localStorage.getItem('userToken')
}
   function addToCart(id){
        try{
            const resp =  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
                productId:id
                },{
                    headers 
            });
            
            getCartItems();
            return resp;

        }catch(error){
         
            return error;
        }
    }

  async function getCartItems(){
   await  axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        })
        .then((resp)=>{console.log(resp);
            settotalPrice(resp.data.data.totalCartPrice)
            setnumOfItems(resp.data.numOfCartItems)
            setallProducts( resp.data.data.products)
            setcardId(resp.data.cartId)
        })
        .catch((error)=>{ console.log(error);
        })
    }


   function UpdateCartItem(id , count){
      axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
            count: count
        } , {
            headers
        })
        .then((resp)=>{ console.log(resp);
            settotalPrice(resp.data.data.totalCartPrice)
            setnumOfItems(resp.data.numOfCartItems)
            setallProducts( resp.data.data.products)
            setcardId(resp.data.cartId)
        })
        .catch((error)=>{ console.log(error);
        })
    }


    function DeleteItem(id){
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
            headers
        })
        .then((resp)=>{ console.log(resp);
            settotalPrice(resp.data.data.totalCartPrice)
            setnumOfItems(resp.data.numOfCartItems)
            setallProducts( resp.data.data.products)
            setcardId(resp.data.cartId)
        })
        .catch((error)=>{ console.log(error);
        })
    }
   
        useEffect(()=>{

            getCartItems()
        } ,[])

    return <CartContext.Provider value={{addToCart , getCartItems , allProducts , setallProducts , setnumOfItems , settotalPrice , totalPrice , numOfItems , UpdateCartItem , DeleteItem , cardId}}>
              {props.children}
 
            </CartContext.Provider>
}
