import React from 'react'
import UserMenue from '../components/UserMenue'
import {IoClose} from 'react-icons/io5'

function UserMenueMobile() {
  return (
    <section className='bg-white h-full w-full py-2'>
      <button onClick={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
        <IoClose size={20}/>
      </button>
      <div className='container mx-auto px-3 py-5 pb-8'>

      <UserMenue/>
      </div>
    </section>
  )
}

export default UserMenueMobile