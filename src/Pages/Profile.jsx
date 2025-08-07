import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit'
import Axios from '../Utils/Axios'
import SummaryAPi from '../common/SummaryApi'
import AxiosToastError from '../Utils/AxiosToastError'
import toast from 'react-hot-toast'
import fetchUserDetails from '../Utils/UserDetail'
import { setUserDetail } from '../store/userSlice'

function Profile() {
    const user = useSelector(state=>state.user)
    const [openProfileAvatarEdit,setProfileAvatarEdit]=useState(false);
    const [loading , setloading] =useState(false)
    const dispatch = useDispatch()

    const [userData,setUserData] = useState({
        name:user.name,
        email:user.email,
        mobile:user.mobile
    })


    useEffect(()=>{
          setUserData({
            name:user.name,
            email:user.email,
             mobile:user.mobile
          })
    },[user])

    const handleOnChange=(e)=>{
            const {name, value} =e.target;

            setUserData((prev)=>{
                return {
                    ...prev,
                    [name]:value
                }
            })
    }



    const handleSubmit= async(e)=>{
         e.preventDefault();
         setloading(true);
         try {
             const response = await Axios({
                ...SummaryAPi.updateUserDetails,
                data:userData
             })

             const responseData = response.data.data;
             console.log(response.data.data)

             if(response.data.success){
                toast.success(response.data.message)

                const userData = await fetchUserDetails();
                dispatch(setUserDetail(userData.data.data.user))
             }

         } catch (error) {
             AxiosToastError(error)
         }
         finally{
            setloading(false)
         }
    }

  return (
    <div className='p-4'>
        {/* Profile upload and display image */}
        <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
           {
             user.avatar?(
                <img alt={user.name}
                 src={user.avatar}
                 className='w-full h-full'
                />
             ):
             (
                <FaRegUserCircle size={60}/>
             )
           }
        </div>

        <button  onClick={()=>{setProfileAvatarEdit(true)}} className='text-sm min-w-20 border border-primary-100 hover:bg-primary-200 px-3 py-1 rounded-full mt-3'>Edit</button>

        {
            openProfileAvatarEdit && (
                <UserProfileAvatarEdit close={()=>{setProfileAvatarEdit(false)}}/>

            )
        }


    {/* name , mobile , email, change password */}

     <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
        <div className='grid'>
            <label htmlFor="">Name</label>
             <input type="text" 
              placeholder='Enter your name'
              className='p-2 bg-blue-50 outline-none outline border focus-within:border-primary-200 rounded'
              value={userData.name}
              name='name'
              onChange={handleOnChange}
              required
             />
        </div>
        <div className='grid'>
            <label htmlFor="email">Email</label>
             <input type="email" 
             id='email'
              placeholder='Enter your email'
              className='p-2 bg-blue-50 outline-none outline border focus-within:border-primary-200 rounded'
              value={userData.email}
              name='email'
              onChange={handleOnChange}
              required
             />
          </div>

        <div className='grid'>
            <label htmlFor="mobile">Mobile</label>
             <input type="text" 
             id='mobile'
              placeholder='Enter your mobile no.'
              className='p-2 bg-blue-50 outline-none outline border focus-within:border-primary-200 rounded'
              value={userData.mobile}
              name='mobile'
              onChange={handleOnChange}
              required
             />
        </div>

        <button className='border px-4 py-2 font-semibold border-primary-100 hover:bg-primary-100 hover:text-white rounded'>

            {
                loading ? ('Loading...'):('Submit')
            }
        </button>
     </form>
    </div>
  )
}

export default Profile