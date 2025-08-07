
import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import AxiosToastError from '../Utils/AxiosToastError';

function ForgotPassword() {
  const navigate=useNavigate()

  const [data, setdata] = useState({
    email: ""
  })

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
    try {
       const response = await  Axios({
         ...SummaryAPi.forgotpassword,
         data:data
       })
       
       if(response.data.success){
        toast.success(response.data.message)
          navigate("/verifyotp",{
          state:{
            email:data
          }
        })
        setdata({
          email:"",
          password:""

        })
      
       }
  
    } catch (error) {
       AxiosToastError(error);
    }
  
  }
  return (
    <section className='bg-blue-50  container px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4'>
        <p className='font-semibold text-lg '>Forgot Password</p>
        <form className='grid gap-2 mt-2' onSubmit={handleSubmit}>
         
        
          <div className='grid gap-1  mt-3'>
            <label htmlFor='email'>Email:</label>
            <input
              type="email"
              id='email'
              placeholder='Enter you email'
              className='bg-blue-50 p-2 border rounded focus:border-primary-200 outline-none'
              name='email'
              value={data.email}
              onChange={handleChange}
            />
         
          </div>
        

          <button disabled={!validateValue} className={`${validateValue ?"bg-green-800 hover:bg-green-700":"bg-gray-500"} text-white rounded py-3 mt-4 font-semibold tracking-wide`} type='submit'>Send Otp</button>
        </form>

        <p className='mt-4'>
          Already have an account? <Link to={"/login"} className="font-bold text-green-700 hover:text-green-800">login</Link>
        </p>
      </div>
    </section>
  )
}

export default ForgotPassword