import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import SummaryAPi from '../common/SummaryApi';
import AxiosToastError from '../Utils/AxiosToastError';
import toast from 'react-hot-toast';
import Axios from '../Utils/Axios';

function ResetPassword() {
    const location=useLocation();
    const navigate =useNavigate();
    const [showpassword, setshowpassword] = useState(false);
    const [showconfirmPassword,setshowconfirmPassword]=useState(false)
    const [data,setdata]=useState({
        email:"",
        newPassword:"",
        confirmPassword:""
    })

    
    useEffect(()=>{
        if(!location?.state?.data?.success){
            navigate("/")
        }
        
        if(location?.state?.email){
            setdata((prev)=>{
                return {
                    ...prev,
                    email:location?.state?.email
                }
            })
        }
        
    },[])
    
    const validateValue=Object.values(data).every(e1=>e1)
      const handleChange = (e) => {
       const { name, value } = e.target
       setdata((prev) => {
         return {
           ...prev,
           [name]: value
         }
       })
     }

  const handleSubmit = async (e)=>{
       e.preventDefault()
       if(data.newPassword !==data.confirmPassword){
        toast.error("New Password and Confirm Password Not match");
        return;
       }
    try {
       const response = await  Axios({
         ...SummaryAPi.resetpassword,
         data:data
       })
       
       if(response.data.success){
        toast.success(response.data.message)
        localStorage.setItem('accesstoken',response.data.data.accesstoken)
        localStorage.setItem('refreshtoken',response.data.data.accesstoken)
          navigate("/login")
        setdata({
          email:"",
          newPassword:"",
          confirmPassword:""

        })
      
       }
  
    } catch (error) {
       AxiosToastError(error);
    }
  
  }
  return (

     <section className='bg-blue-50  container px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4'>
        <p className='font-semibold text-lg '>Enter Password</p>
        <form className='grid gap-2 mt-2' onSubmit={handleSubmit}>
         
        
         <div className='grid gap-1  mt-3'>
            <label htmlFor='newPassword'>New Password:</label>
            <div className='focus-within:border-primary-200 flex items-center bg-blue-50 p-2 border'>
              <input
                type={showpassword ? "text" : "password"}
                id='newPassword'
                className=' rounded w-full outline-none bg-blue-50'
                name='newPassword'
                value={data.newPassword}
                placeholder='Enter your new Password'
                onChange={handleChange}
              />
              <div onClick={() => { setshowpassword(prev => !prev) }} className='cursor-pointer'>
                {
                  showpassword ? (
                    <FaRegEye />
                  ) : (

                    <FaRegEyeSlash />
                  )
                }
              </div>
            </div>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <div className='focus-within:border-primary-200 flex items-center bg-blue-50 p-2 border'>
              <input
                type={showconfirmPassword ? "text" : "password"}
                id='confirmPassword'
                className=' rounded w-full outline-none bg-blue-50'
                name='confirmPassword'
                value={data.confirmPassword}
                placeholder='Confirm your Password'
                onChange={handleChange}
              />
              <div onClick={() => { setshowconfirmPassword(prev => !prev) }} className='cursor-pointer'>
                {
                  showconfirmPassword ? (
                    <FaRegEye />
                  ) : (

                    <FaRegEyeSlash />
                  )
                }
              </div>
            </div>
          </div>
        
        

          <button disabled={!validateValue} className={`${validateValue ?"bg-green-800 hover:bg-green-700":"bg-gray-500"} text-white rounded py-3 mt-4 font-semibold tracking-wide`} type='submit'>Change Password</button>
        </form>

        <p className='mt-4'>
          Already have an account? <Link to={"/login"} className="font-bold text-green-700 hover:text-green-800">Change Password</Link>
        </p>
      </div>
    </section>
  )
}

export default ResetPassword