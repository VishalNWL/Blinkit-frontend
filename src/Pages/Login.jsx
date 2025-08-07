
import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import AxiosToastError from '../Utils/AxiosToastError';
import { useDispatch } from 'react-redux'
import { setUserDetail } from '../store/userSlice'
import fetchUserDetails from '../Utils/UserDetail';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showpassword, setshowpassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: ""
  })

  const validateValue = Object.values(data).every(e1 => e1)
  const handleChange = (e) => {
    const { name, value } = e.target
    setdata((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(data)
      const response = await Axios({
        ...SummaryAPi.login,
        data: data
      })


      if (response.data.error) {
        toast.error("hello");
      }

      if (response.data.success) {
        toast.success(response.data.message)
        console.log(response.data)
        const userDetails = await fetchUserDetails();
        localStorage.setItem('accesstoken',response.data.data.Accesstoken)
        localStorage.setItem('refreshtoken',response.data.data.Refreshtoken)
        dispatch(setUserDetail(response.data.data.user));
        
        setdata({
          email: "",
          password: ""

        })
        navigate("/")
      }

    } catch (error) {
      AxiosToastError(error);
    }

  }
  return (
    <section className='bg-blue-50  container px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4'>
        <p className='text-center text-3xl'>Login</p>
        <form className='grid gap-2 mt-6' onSubmit={handleSubmit}>


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
            <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot password</Link>
          </div>


          <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white rounded py-3 mt-4 font-semibold tracking-wide`} type='submit'>Login</button>
        </form>

        <p className='mt-4'>
          Don't have an account? <Link to={"/register"} className="font-bold text-green-700 hover:text-green-800">Register</Link>
        </p>
      </div>
    </section>
  )
}

export default Login