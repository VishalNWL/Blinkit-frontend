import React from 'react'
import UserMenue from '../components/UserMenue'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Dashboard() {
  const user = useSelector(state=>state.user);


  console.log(user)
  return (
    <section className='bg-white'>
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr]'>
            {/*left for menue */}
             <div className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-auto hidden lg:block border-r'>
                <UserMenue/>
             </div>

            {/*right for content */}
            <div className='bg-white min-h-[75vh]'>
                <Outlet/>
            </div>

        </div>
    </section>
  )
}

export default Dashboard