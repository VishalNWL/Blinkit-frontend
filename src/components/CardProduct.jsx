import React, { useState } from 'react'
import { DisplayPriceInRupees } from '../Utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { validURLConvert } from '../Utils/ValidURLConvert'
import { pricewithDiscount } from '../Utils/PriceWithDiscount'
import {AddToCartButton} from './AddToCartButton'

function CardProduct({data}) {
  const url=`/product/${validURLConvert(data.name)}-${data._id}`

  return (
   <Link to={url} className='border lg:p-4 grid gap-1 lg:gap-3 max-w-36 rounded lg:min-w-52  min-w-36 py-2 bg-white'>
         <div className='min-h-20 w-full  max-h-24 lg:max-h-32 rounded overflow-hidden'>
               <img
                 src={data.image[0]}
                 className='w-full h-full object-scale-down lg:scale-125'
               />
         </div>
         <div className='flex items-center gap-1 text-xs'>
                <div className='p-2 rounded text-sm lg:text-base w-fit md:h-9 h-7 ml-1 flex items-center  text-green-600 bg-green-100'>
             10 min
         </div>
                  <div>
              {
          Boolean(data.discount)&&(
            <p className='text-green-600 bg-green-100 px-2 w-fit rounded '>{data.discount}% discount</p>

          )
         }
          </div>
         </div>
         <div className='px-2 lg:px-0 lg:font-medium font-sm text-ellipsis line-clamp-1  lg:line-clamp-2'>
            {data.name}
         </div>
         <div className='w-fit px-2 text-sm lg:text-base'>
          {data.unit}
 
         </div>

         <div className=' px-2 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='flex items-center gap-1'>
           <div className='text-sm font-semibold'>
           {DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}
           
         </div>
       
        </div>
         <div className='font-semibold'>
          {
            data.stock==0 ? (
              <p className='text-red-500 text-sm text-center'>Out of Stock</p>
            ):
            (
              <AddToCartButton data={data} />
            )
          }
         </div>
         </div>

    </Link>
  )
}

export default CardProduct