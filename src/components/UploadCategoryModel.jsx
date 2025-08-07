import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import UploadImage from '../Utils/UploadImage';
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../Utils/AxiosToastError'

function UploadCategoryModel({ close,fetchData }) {
    const [data, setData] = useState({
        name: "",
        image: ""
    })

    const [loading, setloading] = useState(false)

    const handleOnChange = (e)=>{
       const {name , value} = e.target;
        
       setData((prev)=>{
         return {
            ...prev,
            [name]:value
         }
       })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            setloading(true)
            const response = await Axios({
                ...SummaryAPi.addCategory,
                data:data
            })

            const responsedata = response.data;
            
            if(responsedata.success){
                toast.success(responsedata.message)
                fetchData()
                close();
            }
            
        } catch (error) {
            AxiosToastError(error);
        }
        finally{
            setloading(false)
        }


    }
    const handleUploadCategory = async (e)=>{
        const file = e.target.files[0];
        if(!file){
            return;
        }

        const response = await UploadImage(file)

        const {data:ImageResponse} = response
        
        setData((prev)=>{
            return {
                ...prev,
                image:ImageResponse.data
            }
        })
    }
    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white max-w-4xl  w-full p-4 rounded'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'> Category</h1>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='my-3' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="categoryName">Name</label>
                        <input type="text"
                         id='categoryName'
                         placeholder='Enter category name'
                         value={data.name}
                         name='name'
                         onChange={handleOnChange}
                         className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded'
                        />
                    </div>

                  <div className='grid gap-1'>
                    <p>Image</p>
                   <div className='flex gap-4  flex-col lg:flex-row items-center'>
                     <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center'>
                         {
                            data.image?( 
                                 <img alt='category'
                                  src={data.image}
                                  className='w-full h-full object-scale-down '
                                 /> 
                            ):(

                                <p className='text-sm text-neutral-500'>No Image</p>
                            )
                         }
                    </div>
                    <label htmlFor="uploadCategoryImage">
                    <div  className={`
                       ${!data.name ? 'bg-gray-300':'border-primary-200 hover:bg-primary-200'} cursor-pointer px-4 py-2 rounded border font-semibold`}
                        >Upload Image</div>

                    </label>

                    <input type="file" disabled={!data.name}  id='uploadCategoryImage' onChange={handleUploadCategory} className='hidden' />


                   </div>

                  <button className={
                    `${(data.name && data.image )? "bg-primary-200 hover:bg-primary-100":'bg-slate-300'}
                      font-semibold rounded p-2`
                  }>Add Category</button>
                  </div>

                </form>
            </div>
        </section>
    )
}

export default UploadCategoryModel