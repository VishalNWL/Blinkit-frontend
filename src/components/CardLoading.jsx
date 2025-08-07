import React from 'react'

function CardLoading() {
  return (
    <div className='border lg:p-4 grid gap-1 lg:gap-3 rounded lg:min-w-52  min-w-36 py-2 bg-white animate-pulse'>
         <div className='lg:min-h-20 min-h-14 bg-blue-50 rounded '>

         </div>
         <div className='p-2 lg:p-3 bg-blue-50 rounded w-10 lg:w-20'>

         </div>
         <div className='p-2 lg:p-3 bg-blue-50 rounded w-[8rem] lg:w-14'>

         </div>
         <div className='p-2 lg:p-3 bg-blue-50 rounded w-[8rem] lg:w-14'>

         </div>

         <div className='flex items-center justify-between gap-3'>
         <div className='p-2 lg:p-3 bg-blue-50 rounded w-12 lg:w-20'>

         </div>
         <div className='p-2 lg:p-3 bg-blue-50 rounded w-12 lg:w-20'>

         </div>
         </div>

    </div>
  )
}

export default CardLoading