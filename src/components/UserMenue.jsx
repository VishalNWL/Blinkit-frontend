import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../Utils/Axios'
import SummaryAPi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from "../Utils/AxiosToastError"
import {HiOutlineExternalLink} from "react-icons/hi"
import isAdmin from '../Utils/isAdmin'

function UserMenue({close=()=>{}}) {
    const user = useSelector((state)=>state.user)
    const dispatch= useDispatch()
    const navigate = useNavigate();

    const handlelogout = async()=>{
        try {
          const response = await Axios({
            ...SummaryAPi.logout
          })
          
          if(response.status===200){
                close();
                dispatch(logout());
                localStorage.clear();
                toast.success(response.data.message)
                navigate("/")
            }
            
        } catch (error) {
            // AxiosToastError(error.message)
            console.log(error)
            
        }
    }

    const handleClose = ()=>{
      if(close){
        close();
      }
    }


  return (
    <div>
       <div className='font-semibold'>My account</div>
       <div className='text-sm flex items-center gap-2'>
        <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}<span className='text-medium text-red-600'>{(user.role ==='ADMIN')?"(Admin)":"" }</span></span>
            <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'><HiOutlineExternalLink size={15}/>
            </Link>
            </div>
            <Divider/>

          <div className='text-sm grid gap-2'>
            {
              isAdmin(user.role) && (

                <>
                <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-orange-200 py-1'>Category</Link>
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-200 py-1'>Sub Category</Link>
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-orange-200 py-1'>Upload Product</Link>
                <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-orange-200 py-1'>Product</Link>
                </>
              )
            }





            <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 hover:bg-orange-200 py-1'>My Order</Link>

            <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-orange-200 py-1'>Save Addresses</Link>

            <button className='text-left px-2 hover:bg-orange-200 py-1' onClick={handlelogout}>Log Out</button>

       </div>
    </div>
  )
}

export default UserMenue