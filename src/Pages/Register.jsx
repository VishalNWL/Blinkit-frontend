
import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import AxiosToastError from '../Utils/AxiosToastError';

function Register() {
  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const navigate = useNavigate()
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
      if(data.password!==data.confirmPassword){
        toast.error("Password and Confirm Password must be same");
        return;
      }

    try {
       const response = await  Axios({
         ...SummaryAPi.register,
         data:data
       })

       if(response.data.error){
         toast.error(response.data.message);
       }
       
       if(response.data.success){
        toast.success(response.data.message)
        setdata({
          name:"",
          email:"",
          password:"",
          confirmPassword:""

        })
        navigate("/login")
       }
  
    } catch (error) {
       AxiosToastError(error);
    }
  
  }
  return (
    <section className='bg-white container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4'>
        <p className='text-center text-3xl'>Welcome to Blinkit</p>
        <form className='grid gap-2 mt-6' onSubmit={handleSubmit}>
          <div className='grid gap-1 '>
            <label htmlFor='name'>Name:</label>
            <input
              type="text"
              id='name'
              autoFocus
              className='bg-blue-50 p-2 border rounded focus:border-primary-200 outline-none'
              placeholder='Enter you name'
              name='name'
              value={data.name}
              onChange={handleChange}
            />
          </div>
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
          <div className='grid gap-1  mt-3'>
            <label htmlFor='password'>Password:</label>
            <div className='focus-within:border-primary-200 flex items-center bg-blue-50 p-2 border'>
              <input
                type={showpassword ? "text" : "password"}
                id='password'
                className=' rounded w-full outline-none bg-blue-50'
                name='password'
                value={data.password}
                placeholder='Enter your Password'
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
          </div>
          <div className='grid gap-1 mt-3'>
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
              <div onClick={() => { setShowconfirmPassword(prev => !prev) }} className='cursor-pointer'>
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

          <button disabled={!validateValue} className={`${validateValue ?"bg-green-800 hover:bg-green-700":"bg-gray-500"} text-white rounded py-3 mt-4 font-semibold tracking-wide`} type='submit'>Register</button>
        </form>

        <p className='mt-4'>
          Already have an account? <Link to={"/login"} className="font-bold text-green-700 hover:text-green-800">Login</Link>
        </p>
      </div>
    </section>
  )
}

export default Register