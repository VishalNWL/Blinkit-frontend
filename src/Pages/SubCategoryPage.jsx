import React, { useEffect } from 'react'
import { useState } from 'react';
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';
import Axios from '../Utils/Axios';
import SummaryAPi from '../common/SummaryApi';
import DisplayTable from '../components/DisplayTable';
import {createColumnHelper} from '@tanstack/react-table'
import ViewImage from '../components/ViewImage';
import {HiPencil} from 'react-icons/hi'
import {MdDelete} from 'react-icons/md'
import EditSubCategory from '../components/EditSubCategory';
import ConfirmBox from '../components/ConfirmBox';
import AxiosToastError from '../Utils/AxiosToastError';
import toast from 'react-hot-toast';

function SubCategoryPage() {
  const [openAddSubCategory,setOpenAddSubCategory]=useState(false)
  const [data,setData] = useState([])
  const [loading,setloading] = useState(false)
  const columnHelper = createColumnHelper()
 const [imageURL,setImageURL] = useState("")
 const [openEdit,setOpenEdit] = useState(false)
 const [editData,setEditData]=useState({
  _id:""
 })

 const [deleteSubCategory,setDeleteSubCategory]= useState({
  _id:""
 })

 const [openDeleteConfirmBox,setOpenDeleteConfirmBox]=useState(false)

  const column =[
    columnHelper.accessor('name',{
      header:"Name"
    }),
    columnHelper.accessor('image',{
      header:"Image",
      cell:({row})=>{
        return <div className='flex justify-center items-center'>
           <img
          src={`${row.original.image}`}
          alt={`${row.original.name}`}
          className='w-8 h-8 cursor-pointer'
          onClick={()=>{
            setImageURL(row.original.image)
          }}
        />
        </div>
      }
    }),

    columnHelper.accessor('category',{
      header:'Category',
      cell:({row})=>{
        return(
          <>
           { 
           row.original.category.map((c,idx)=>{
            return(
              <p key={c._id+"table"} className='shadow-md px-1 inline'>{c.name}</p>
            )
           })
           
           }
          </>
        )
      }
    }),

    columnHelper.accessor("_id",{
      header:"Action",
      cell:({row})=>{
        return (
          <div className='flex items-center justify-center gap-3'>
            <button onClick={()=>{setOpenEdit(true); setEditData(row.original)}} className='p-2 bg-green-100 rounded-full hover:text-green-600'>
               <HiPencil size={20}/>
            </button>
            <button onClick={()=>{setOpenDeleteConfirmBox(true); setDeleteSubCategory(row.original)}} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
               <MdDelete size={20}/>
            </button>
          </div>
        )
      }
    })
  ]


  const fetchSubCategory =async()=>{
    try {
      setloading(true);
       const response = await Axios({
        ...SummaryAPi.getSubCategory
       })

       const {data:responseData}=response
       if(responseData.success){
            setData(responseData.data)
       }
    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setloading(false)
    }
  }
  useEffect(()=>{
    fetchSubCategory()
  },[])


  const handleDeleteSubCategory=async()=>{
       try {
          const response = await Axios({
            ...SummaryAPi.deleteSubCategory,
            data:deleteSubCategory
          })

          const {data:responseData}= response
          console.log("dta"+responseData)
          if(responseData.success){
            toast.success(responseData.message)
            fetchSubCategory()
            setOpenDeleteConfirmBox(false)
            setDeleteSubCategory({_id:""})
          }
       } catch (error) {
         AxiosToastError(error)
       }
  }


  return (
        <section className=''>
        <div className='p-2 bg-white shadow-md flex items-center justify-between '>
            <h2 className=' font-semibold'>Category</h2>
            <button onClick={()=>{setOpenAddSubCategory(true)}} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub-Category</button>
        </div>
        <div className='overflow-auto w-full max-w-[95vw]'>
          <DisplayTable
            data={data}
            column={column}
          />
        </div>
        {
          openAddSubCategory && (
            <UploadSubCategoryModel
             close={()=>setOpenAddSubCategory(false)}
             fetchData={fetchSubCategory}
            />
          )
        }
        {
          imageURL&&
          <ViewImage url={imageURL} close={()=>setImageURL("")}/>
        }

        {
          openEdit&&

          <EditSubCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchSubCategory}/>
        }
        {
          openDeleteConfirmBox &&
          <ConfirmBox 
            cancel={()=>setOpenDeleteConfirmBox(false)}
            close={()=>setOpenDeleteConfirmBox(false)}
            confirm={handleDeleteSubCategory}
          />
        }
        </section>
  )
}

export default SubCategoryPage