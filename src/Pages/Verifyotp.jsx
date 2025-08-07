
import React, { useEffect, useRef, useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import AxiosToastError from '../Utils/AxiosToastError';

function Verifyotp() {
  const navigate=useNavigate()

  const [data, setdata] = useState(["","","","","",""])
  const inputRef = useRef([]);
  const validateValue=data.every(e1=>e1)
  const location = useLocation();

useEffect(()=>{
    if(!location?.state?.email){
        navigate('/forgot-password')
    }
},[])
  const handleSubmit = async (e)=>{
       e.preventDefault()
    try {
       const response = await  Axios({
         ...SummaryAPi.forgot_password_verification_otp,
         data:{
            otp: data.join(""),
            // location.state.email is an object like {email:''}
            email:location?.state?.email.email
         }
       })
       
       if(response.data.success){
        toast.success(response.data.message)
        setdata(["","","","","",""])
        navigate("/reset-password",{
            state:{
                data:response.data,
                email:location?.state?.email.email
            }
        })
       }
  
    } catch (error) {
       AxiosToastError(error);
    }
  
  }
  return (
    <section className='bg-blue-50  container px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4'>
        <p className='font-semibold text-lg '>Enter OTP</p>
        <form className='grid gap-2 mt-2' onSubmit={handleSubmit}>
         
        
          <div className='grid gap-1  mt-3'>
            <label htmlFor='otp'>Enter Your OTP:</label>
             <div className='flex items-center gap-2 justify-between mt-3'>
                {
                    data.map((e,idx)=>{
                        return(
                            <input
                              key={'otp'+idx}
                              type="text"
                              id='otp'
                              ref={(ref)=>{
                                  inputRef.current[idx]=ref;
                                  return ref;
                              }}
                              value={data[idx]}
                              onChange={(e)=>{
                                const value = e.target.value
                                const newdata = [...data];
                                newdata[idx]= value;
                                setdata(newdata)

                                if(value && idx<5){
                                    inputRef.current[idx+1].focus();
                                }
                              }}
                              className='bg-blue-50 w-full max-w-16 p-2 border rounded focus:border-primary-200 outline-none
                              text-center font-semibold'
                              maxLength={1}
                            />

                        )  
                    })
                }
             </div>
         
          </div>
        

          <button disabled={!validateValue} className={`${validateValue ?"bg-green-800 hover:bg-green-700":"bg-gray-500"} text-white rounded py-3 mt-4 font-semibold tracking-wide`} type='submit'>Verify Otp</button>
        </form>

        <p className='mt-4'>
          Already have an account? <Link to={"/login"} className="font-bold text-green-700 hover:text-green-800">login</Link>
        </p>
      </div>
    </section>
  )
}

export default Verifyotp