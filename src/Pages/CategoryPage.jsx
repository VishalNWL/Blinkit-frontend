import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import { useEffect } from 'react';
import Loading from '../components/Loading';
import Nodata from '../components/Nodata';
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import EditCategory from '../components/EditCategory';
import ConfirmBox from '../components/ConfirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../Utils/AxiosToastError';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CategoryPage() {
    const [openUploadCategory,setOpenUploadCategory]= useState(false);
    const [loading, setloading]=useState(false);
    const [categoryData,setCategoryData] = useState([])
    const [openEdit,setOpenEdit]=useState(false)
    const [editData, setEditData]= useState({
        name:"",
        image:""
    })
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete]=useState(false)
    const [deleteCategory,setDeleteCategory]=useState({
        _id:""
    })

    const allCategory = useSelector(state=>state.product.allCategory)
    useEffect(()=>{
    },[allCategory])
    


    const fetchCategory = async()=>{
        try {

            setloading(true)
            const response = await Axios({
                ...SummaryAPi.getCategory,
            })

            const {data:responseData} = response;
            if(responseData.success){
                setCategoryData(responseData.data);
            }
            
        } catch (error) {
            
        }
        finally{
            setloading(false)
        }
    }

    useEffect(()=>{
        fetchCategory();
    },[])
    

    const handleDelete = async()=>{
             try {
                const response = await Axios({
                    ...SummaryAPi.deleteCategory,
                    data:deleteCategory
                })

                const {data:responseData} = response
                if(responseData.success){
                    toast.success(responseData.message);
                    fetchCategory();
                    setOpenConfirmBoxDelete(false)
                }
             } catch (error) {
                AxiosToastError(error);
             }
    }
  return (
    <section className=''>
        <div className='p-2 bg-white shadow-md flex items-center justify-between '>
            <h2 className=' font-semibold'>Category</h2>
            <button onClick={()=>{setOpenUploadCategory(true); }} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
        </div>
        {
            !categoryData[0] && !loading && (
                <Nodata/>
            )
        }
    
       <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
            {
            categoryData.map((category,index)=>{
                return (
                    <div className='w-32  h-56  bg-[#edf4f] rounded shadow ' key={category._id}>
                        <img src={category.image} alt={category.name}
                         className='object-scale-down w-full'
                        />
                        <div className=' items-center h-9 flex gap-2 justify-around px-1'>
                            <button onClick={()=>{setOpenEdit(true);setEditData(category) }} className='flex-1 bg-green-100 text-green-600 font-medium py-1 rounded hover:bg-green-200'>Edit</button>
                            <button onClick={()=>{setOpenConfirmBoxDelete(true); setDeleteCategory(category)}} className='flex-1 bg-red-100 text-red-600 font-medium py-1 rounded hover:bg-red-200'>Delete</button>
                        </div>
                    </div>
                )
            })
        }
       </div>

        {
            loading&& (
                <Loading/>
            )
        }

        {
            openUploadCategory && (

                <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
            )
        }
        {
            openEdit && (
                <EditCategory data={editData} close={()=>{setOpenEdit(false)}} fetchData={fetchCategory}/>
            )
        }
        {
           openConfirmBoxDelete && (
             <ConfirmBox close={()=>{setOpenConfirmBoxDelete(false)}}  confirm={()=>handleDelete()} cancel={()=>setOpenConfirmBoxDelete(false)}/>
           )
        }
    </section>
  )
}

export default CategoryPage