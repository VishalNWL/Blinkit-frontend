import React, { useState } from 'react'
import { DisplayPriceInRupees } from '../Utils/DisplayPriceInRupees'
import { useGlobalContext } from '../provider/GlobalProvider'
import Address from '../components/Address';
import { useSelector } from 'react-redux';
import AxiosToastError from '../Utils/AxiosToastError';
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js'

function CheckoutPage() {
    const { notDiscountTotalPrice, totalPrice, totalQty,fetchCartItem ,fetchOrder} = useGlobalContext()
    const [openAddress,setOpenAddress] = useState(false);
    const addressList = useSelector(state=>state.addresses)
    const [selectedAddress,setSelectedAddress]=useState(0)
    const cartItemsList = useSelector(state=>state.cartItem.cart)
    const navigate = useNavigate()

    const handleCashOnDelivery = async()=>{
       try {
     
          const response= await Axios({
            ...SummaryAPi.CashOnDeliveryOrder,
            data:{
                list_items:cartItemsList,
                addressId:addressList.addresssList[selectedAddress]?._id,
                totalAmt:totalPrice,
                subTotalAmt:totalPrice
            }
          })

          const {data:responseData} = response
          if(responseData.success){
               toast.success(responseData.message)
               if(fetchCartItem){
                fetchCartItem()
            }
            if(fetchOrder){
                fetchOrder()
            }
            navigate('/success',{
                state:{
                    text:"Order Successfull"
                }
            })

          }
       } catch (error) {
         AxiosToastError(error)
       }
    }

    const handleOnlinePayment= async()=>{
       try {
        toast.loading("Loading")
        const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
        const stripePromise = await loadStripe(stripePublicKey)

        const response = await Axios({
            ...SummaryAPi.payment_url,
            data:{
                     list_items:cartItemsList,
                addressId:addressList[selectedAddress]?._id,
                totalAmt:totalPrice,
                subTotalAmt:totalPrice
            }
        })

        const {data:responseData}= response
        stripePromise.redirectToCheckout({sessionId:responseData.id})
              if(fetchCartItem){
                fetchCartItem()
            }
            if(fetchOrder){
                fetchOrder()
            }

       } catch (error) {
        //   AxiosToastError(error)
        console.log(error)
       }
    }
    return (
        <section className='bg-blue-50'>
            <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
                <div className='w-full '>
                    {/*address*/}
                    <h3 className='text-lg font-semibold'>Choose your address</h3>
                    
                        <div className='bg-white p-2 grid gap-4'>
                           {
                            addressList.addresssList.map((address,index)=>{
                                return (
                                    <label htmlFor={'address'+index} className={!address.status&& "hidden"}>
                                    <div key={address+index} className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                                        <div>
                                            <input
                                              type='radio' name='address' value={index} 
                                              onChange={(e)=>setSelectedAddress(e.target.value)}
                                              id={'address'+index}
                                            />
                                        </div>
                                        <div>
                                        <p>{address.address_line}</p>
                                        <p>{address.city}</p>
                                        <p>{address.state}</p>
                                        <p>{address.country} - {address.pincode}</p>
                                        <p>{address.mobile}</p>
                                        </div>
                                    </div>
                                    </label>
                                )
                            })
                           }
                    <div onClick={()=>setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center'>
                        Add Address
                    </div>
                        </div>
                    
                </div>
                <div className='w-full max-w-md bg-white py-4 px-2'>
                    {/*summary*/}
                    <h3 className='font-semibold text-lg'>Summary</h3>
                    <div className='bg-white p-4'>
                        <h3 className='semibold'>Bill details</h3>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Items total</p>
                            <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
                        </div>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Total Quantity</p>
                            <p className='flex items-center gap-2'>{totalQty} items</p>
                        </div>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Delivery Charge</p>
                            <p className='flex items-center gap-2'>Free</p>
                        </div>
                        <div className='font-semibold flex items-center justify-between gap-4'>
                            <p>Grand Total</p>
                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-4'>
                        <button onClick={handleOnlinePayment} className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded font-semibold text-white'>Online Payment</button>
                        <button onClick={handleCashOnDelivery} className='py-2 px-4 text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white'>Cash on Delivery</button>
                    </div>

                </div>
            </div>

            {
                openAddress && (
                    <Address close={()=>setOpenAddress(false)}/>
                )
            }
        </section>
    )
}

export default CheckoutPage