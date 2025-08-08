import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useLoaderData, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './Utils/UserDetail'
import { setUserDetail } from './store/userSlice'
import { useDispatch } from 'react-redux'
import { setAllCategory , setAllSubCategory ,setLoadingCategory} from './store/ProductSlice'
import Axios from './Utils/Axios'
import SummaryAPi from './common/SummaryApi'
import { handleAddItemCart } from './store/cartProduct'
import GlobalProvider, { useGlobalContext } from './provider/GlobalProvider'
import { FaCartShopping } from 'react-icons/fa6'
import CartMoblieLink from './components/CartMoblie'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  
 
  
  const fetchUser = async()=>{
        const userData = await fetchUserDetails()
        dispatch(setUserDetail(userData.data.data.user))
  }

  const fetchCategory = async()=>{
          try {
  
              // setloading(true)
              dispatch(setLoadingCategory(true))
              const response = await Axios({
                  ...SummaryAPi.getCategory,
              })
  
              const {data:responseData} = response;
              if(responseData.success){
                responseData.data.reverse() //remove this 
                dispatch(setAllCategory(responseData.data))
                  // setCategoryData(responseData.data);
              }
              
          } catch (error) {
              console.log(error)
          }
          finally{
              dispatch(setLoadingCategory(false))
          }
      }
  
  const fetchSubCategory = async()=>{
          try {
  
              // setloading(true)
              const response = await Axios({
                  ...SummaryAPi.getSubCategory,
              })
  
              const {data:responseData} = response;
              if(responseData.success){
            
                dispatch(setAllSubCategory(responseData.data))
                  // setCategoryData(responseData.data);
              }
              
          } catch (error) {
              console.log(error)
          }
          // finally{
          //     // setloading(false)
          // }
      }


      
  useEffect(()=>{
    fetchCategory();
     fetchUser();
     fetchSubCategory();
    //  fetchCartItem()
  })

  console.log("Base URL in production:", import.meta.env.VITE_VITE_API_URL);

  return (
   <GlobalProvider>
    <Header/>
     <main className='min-h-[78vh]'>
       <Outlet/>
     </main>
     <Footer/>
     <Toaster/>
     {
        location.pathname!=='/checkout' && (
            
            <CartMoblieLink/>
        )
     }
    
   </GlobalProvider>
  )
}

export default App
