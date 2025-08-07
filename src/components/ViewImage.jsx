import React from 'react'
import { IoClose } from 'react-icons/io5'

function ViewImage({url,close}) {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50 p-4 bg-black bg-opacity-80'>
        <div className='w-full max-w-md p-4 bg-white max-h-[80vh]'>
            <button onClick={close} className='w-fit ml-auto block'>
                <IoClose size={25}/>
            </button>
             <img
               src = {url}
               alt='full Screen'
               className='w-full h-full object-scale-down'
             />
        </div>
    </div>
  )
}

export default ViewImage