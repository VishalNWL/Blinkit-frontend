import React from 'react'
import { useSelector } from 'react-redux'
import Nodata from '../components/Nodata'

function MyOrders() {
  const orders = useSelector(state=>state.orders.order)
  console.log("order",orders)
  return (
    <div>
      <div className='bg-white shadow-md p-3 fobnt-semibold '>
        <h1 className='font-semibold'>Orders</h1>
      </div>
      {
        !orders[0] && (
           <Nodata/>
        )
      }
      {
        orders.map((order,idx)=>{
          return (
             <div key={order._id+idx+"order"} className='order rounded-md p-4 text-sm w-full bg-green-100 shadow-sm my-2'>
                 <p>Order No:{order?.orderId}</p>
                 <div className='flex gap-3'>
                   <img
                     src={order.product_details.image[0]}
                     className='w-14 h-14'
                   />
                   <p className='font-medium'>{order.product_details.name}</p>
                 </div>
             </div>
          )
        })
      }
    </div>
  )
}

export default MyOrders