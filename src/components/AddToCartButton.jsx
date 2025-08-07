import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../Utils/AxiosToastError';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa6';

export const AddToCartButton=({data})=>{
      const {fetchCartItem,updateCartItem,deleteCartItem}=useGlobalContext()
      const [loading,setLoading]= useState(false)
      const cartItem= useSelector(state=>state.cartItem.cart)
      const [isAvailableCart,setIsAvailableCart] = useState(false)
      const [qty,setQty]=useState(0)
      const [cartItemDetails,setCartItemDetails]=useState()

      console.log("addtocartbutton",cartItem)
    
      const handleAddToCart=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
    
        try {
           
          setLoading(true)
          const response = await Axios({
            ...SummaryAPi.addToCart,
            data:{productId:data?._id}
          })
    
          const {data:responseData}=response
    
          if(responseData.success){
            toast.success(responseData.message)
            if(fetchCartItem){
             fetchCartItem()
            }
          }
    
        } catch (error) {
          console.log(error)
          AxiosToastError(error)
        }
        finally{
          setLoading(false)
        }
    
      }

      //checking this item is in cart or not

      useEffect(()=>{
         const checkingitem = cartItem.some(item=>item.productId._id===data._id)
         setIsAvailableCart(checkingitem)
         
         const product = cartItem.find(item=>item.productId._id===data._id)
         setQty(product?.quantity)
         setCartItemDetails(product)
         
        },[data,cartItem])
      
        const increaseQty=async(e)=>{
            e.preventDefault();
            e.stopPropagation();
            
          const response= await updateCartItem(cartItemDetails?._id,qty+1)
          
          if(response.success)
          {
            toast.success("Item added")
          }
        }
        
        const decreaseQty=async(e)=>{
            e.preventDefault();
            e.stopPropagation();
            if(qty===1){
                deleteCartItem(cartItemDetails?._id)
                isAvailableCart(false)
              
            }
            else{
               
             const response=  updateCartItem(cartItemDetails?._id,qty-1)

             if(response.success){
              toast.success("Item removed")
             }

           }
      }
  return (
    <div className='w-full max-w-[150ox]'>
        {
            isAvailableCart?(
                <div className='flex w-full h-full'>
                    <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-fit p-1 rounded flex items-center justify-center max-w-6'><FaMinus/></button>
                    <p className='flex-1 w-fit font-semibold px-1 flex items-center justify-center max-w-5'>{qty}</p>
                    <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-fit p-1 rounded flex items-center justify-center max-w-6'><FaPlus/></button>
                </div>
            ):(
        <button
               onClick={handleAddToCart}
               className='bg-green-600 hover:bg-green-700 text-white rounded lg:px-4 px-2 py-1'
              >
                {
                    loading? <Loading/> : "Add"
                }
              </button>

            )
        }
    </div>
  )
}