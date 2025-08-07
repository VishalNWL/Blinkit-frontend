import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import AxiosToastError from '../Utils/AxiosToastError';
import { updateAvatar } from '../store/userSlice';
import { IoClose } from 'react-icons/io5';

function UserProfileAvatarEdit({close}) {
    const user = useSelector(state=>state.user)
    const [loading,setloading] = useState(false);
   const dispatch = useDispatch();
    const handleSUbmit =(e)=>{
        e.preventDefault();
    }

    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0];
        if(!file){
            return;
        }
        setloading(true)
        try {
            const formData = new FormData();
            formData.append("avatar",file);
    
            const response = await Axios({
                ...SummaryAPi.uploadAvatar,
                data:formData
                
            })

            console.log(response.data.data.avatar)
            dispatch(updateAvatar(response.data.data.avatar))
            
        } catch (error) {
            AxiosToastError(error);
        }
        finally{
            setloading(false);
        }


        console.log(response)
    }
  return (
    <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-60 p-4 flex flex-col items-center justify-center'>
        <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
             <button className='text-neutral-800 block w-fit ml-auto'>
                 <IoClose size={20} onClick={()=>close()} />
             </button>
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
            
              <form onSubmit={handleSUbmit}>
                 <label htmlFor="uploadprofile">
                      <div className='border cursor-pointer border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3'>
                        {
                            loading? "Loading...":"Upload"
                        }
                      </div>
                 </label>
                 <input onChange={handleUploadAvatarImage} type="file"  id='uploadprofile' className='hidden' />
              </form>
           
        </div>

    </section>
  )
}

export default UserProfileAvatarEdit