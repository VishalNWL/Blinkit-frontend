import React from 'react'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import UploadImage from '../Utils/UploadImage'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../Utils/Axios'
import SummaryAPi from '../common/SummaryApi'
import AxiosToastError from '../Utils/AxiosToastError'
import toast from 'react-hot-toast'

function UploadSubCategoryModel({ close ,fetchData }) {
    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: [],

    })


const allCategory  = useSelector(state=>state.product.allCategory)

    const handleChange = (e) => {
        const { name, value } = e.target

        setSubCategoryData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0]

        if (!file) {
            return;
        }
        const response = await UploadImage(file)

        const { data: ImageResponse } = response

        setSubCategoryData((prev) => {
            return {
                ...prev,
                image: ImageResponse.data
            }
        })

    }
    
    const handleRemoveCategorySelected = (categoryId)=>{
        const index = subCategoryData.category.findIndex(el=>el._id===categoryId)
        subCategoryData.category.splice(index,1)
        setSubCategoryData((prev)=>{
           return {
             ...prev
           }

        })
    }

    const handleSubmitSubCategory= async(e)=>{
        try {
            e.preventDefault()
            const response = await Axios({
                ...SummaryAPi.createSubCategory,
                data:subCategoryData
            })

            const {data:responseData} = response
        
            if(responseData.success){
                toast.success(responseData.message)
                fetchData();
                if(close){
                    close()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-5xl bg-white p-4 rounded'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold '>Add Sub Category</h1>
                    <button onClick={close}><IoClose size={25} /></button>
                </div>
                <form className='my-3 gap-3' onSubmit={handleSubmitSubCategory}>

                    <div className='grid gap-1'>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            className='p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded'
                            id='name'
                            name='name'
                            value={subCategoryData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex flex-col gap-3 lg:flex-row items-center'>
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    !subCategoryData.image ? (
                                        <p className='text-sm text-neutral-400 '>No Image</p>
                                    ) : (
                                        <img
                                            src={subCategoryData.image}
                                            className='w-full h-full object-scale-down'
                                            alt="subCategory" />
                                    )
                                }
                            </div>
                            <label htmlFor="uploadSubCategoryImage">
                                <div className='px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-800 cursor-pointer'>Upload Image</div>
                            </label>
                            <input type="file"
                                id='uploadSubCategoryImage'
                                className='hidden'
                                onChange={handleUploadSubCategoryImage}
                            />

                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor="">Select Catagory</label>
                        <div className='border focus-within:border-primary-200'>
                            {/* display value */}
                            <div className='flex flex-wrap gap-2'>

                                {
                                    subCategoryData.category.map((cat,idx)=>{
                                        return (
                                            <p key={cat._id+'selectedValue'} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>{cat.name}
                                             <div className='cursor-pointer hover:text-red-500' onClick={()=> handleRemoveCategorySelected(cat._id)}>
                                                <IoClose size={20}/>
                                             </div>
                                            </p>
                                        )
                                  
                                    })
                                }
                            </div>

                            {/* select category */}

                            <select 
                            className='w-full p-2 bg-transparent outline-none border'
                             onChange={(e)=>{
                                const value = e.target.value
                                if(subCategoryData.category.findIndex(el=>el._id==value)!==-1){
                                    return;
                                }

                                const categoryDetails = allCategory.find(e1=>e1._id==value)
                                setSubCategoryData((prev)=>{
                                          return{
                                             ...prev,
                                             category:[...prev.category,categoryDetails]
                                          }
                                })
                               

                             }}
                            >
                                <option value={""} disabled selected>Select Category</option>
                                {
                                    allCategory.map((category,index)=>{
                                        return (
                                              <option value={category?._id} key={category?._id+"subCategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                  <button
                    className={`px-4 py-1 border w-full mt-2
                        ${subCategoryData.name && subCategoryData.image && subCategoryData.category[0]?"bg-primary-200 hover:bg-primary-100":"bg-gray-200 cursor-not-allowed"}
                        font-semibold`}
                  >
                    Submit
                  </button>
                </form>
            </div>

        </section>
    )
}

export default UploadSubCategoryModel