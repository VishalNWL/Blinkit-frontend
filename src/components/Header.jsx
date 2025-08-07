import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {FaRegCircleUser} from "react-icons/fa6"
import useMobile from '../../hooks/useMobile'
import {BsCart4} from "react-icons/bs";
import {useSelector} from 'react-redux'
import {GoTriangleDown,GoTriangleUp} from 'react-icons/go'
import UserMenue from './UserMenue'
import { DisplayPriceInRupees } from '../Utils/DisplayPriceInRupees'
import { useGlobalContext } from '../provider/GlobalProvider'
import DisplayCartItem from './DisplayCartItem'

function Header() {
  const navigate = useNavigate();
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname ==='/search';
  const user = useSelector((state)=>state.user);
  const [openUserMenue,setopenUserMenue]=useState(false)
  const cartItem = useSelector(state=>state.cartItem.cart)
  const {totalPrice,totalQty} = useGlobalContext()
  const [openCartSection,setOpenCartSection]=useState(false)
  // const [totalPrice,setTotalPrice]=useState(0)
  // const [totalQty,setTotalQty] = useState(0)

  console.log(cartItem)

  const redirectToLogin=()=>{
    navigate('/login')
  }
  const redirectTosearch=()=>{
    navigate('/search');
  }
  
    const handleCloseUserMenue =()=>{
           setopenUserMenue(false);
    }

    const handleMobileUser=()=>{
       if(!user._id){
         navigate('/login')
         return;
       }

       navigate('/user')
    }

    //total items and total price

    // useEffect(()=>{
    //     const qty = cartItem.reduce((prev,curr)=>{
    //       return prev+curr.quantity
    //     },0)

    //    setTotalQty(qty);

    //    const tPrice = cartItem.reduce((prev,curr)=>{
    //     return prev + (curr.productId.price*curr.quantity)
    //    },0)

    //    setTotalPrice(tPrice)

    // },[cartItem])
    
  return (
    <header className=' shadow-md h-24 lg:h-20 sticky top-0 flex z-40 justify-center items-center flex-col bg-white'>
       {
        !(isSearchPage && isMobile) &&
         <> <div className='container h-24 flex items-center mx-auto px-2 justify-between'>
                <div className='h-full'>
                  <Link to={'/'} className='h-full flex justify-center items-center'>
                    <img src={logo} alt="logo" 
                    height={60} 
                    width={170}
                    className='hidden lg:block'
                     />
                    <img src={logo} alt="logo" 
                    height={60} 
                    width={170}
                    className='lg:hidden'
                     />
                  </Link>
                </div>

              <div className='hidden lg:block'>
               <Search onClickSearch={redirectTosearch}></Search>
              </div>

              <div >
                {/*user icon only for mobile version*/}
                <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                  <FaRegCircleUser size={26} />
                </button>
                   
                {/*Desktop*/}
                 <div className='hidden lg:flex gap-10 items-center'>
                  {
                    user?._id?(
                      <div className='relative'>
                          <div onClick={()=>{setopenUserMenue(prev=>!prev)}} className='flex items-center gap-1 cursor-pointer select-none'>
                             <p>Account</p>
                             {
                              openUserMenue?(
                                <GoTriangleUp size={25}/>

                              ):(
                                <GoTriangleDown size={25}/>
                              )
                             }
                          </div>
                           {
                            openUserMenue && (
                              
                             <div className='absolute right-0 top-12'>
                              <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                 <UserMenue close={handleCloseUserMenue}/>
                              </div>
                            </div>
                            )
                           }
                          
                      </div>
                    ):(
                      <button onClick={redirectToLogin} className='text-lg px-2'>Login</button>
                    )
                  }

                    <button onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white '>
                      {/*add to cart icon */}
                      <div className='animate-bounce'>
                         <BsCart4 size={26}/>
                      </div>
                      <div className='font-semibold text-sm'>
                      {
                        cartItem[0]?(
                          <div>
                             <p>{totalQty} Items</p>
                             <p>{DisplayPriceInRupees(totalPrice)}</p>
                          </div>
                        ):(

                         <p>My Cart</p>
                        )
                      }
                      </div>
                    </button>
                 </div>
              </div>
          </div>
          </>
       }

          <div className='container mx-auto px-2 lg:hidden pb-1'>
            <Search onClickSearch={redirectTosearch}/>
          </div>

          {
            openCartSection && (
              <DisplayCartItem close={()=>setOpenCartSection(false)}/>
            )
          }
    </header>
  )
}

export default Header