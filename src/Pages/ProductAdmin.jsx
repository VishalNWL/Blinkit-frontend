import React, { useEffect } from 'react'
import { useState } from 'react'
import AxiosToastError from '../Utils/AxiosToastError'
import Axios from '../Utils/Axios'
import SummaryAPi from '../common/SummaryApi'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoSearchOutline } from 'react-icons/io5'
import EditProductAdmin from '../components/EditProductAdmin'

function ProductAdmin() {

  const [productData, setProductData] = useState([])
  const [page,setPage]= useState(1)
  const [loading ,setloading]= useState(false)
  const [totalPageCount,setTotalPageCount] = useState(1)
  const [search,setSearch] = useState("")

  const fetchProductData = async()=>{
    try {
      setloading(true);
      const response = await Axios({
          ...SummaryAPi.getProduct,
          data:{
            page:page,
            search:search
          }
      })

      const {data:responseData}=response;
      

      if(responseData.success){
        setProductData(responseData.data.data)
        setTotalPageCount(responseData.data.totalPage)
      }
      
    } catch (error) {
        AxiosToastError(error)
    }
    finally{
      setloading(false)
    }
  }

  const handleNext=()=>{
     if(page===totalPageCount){
       return;
     }

     setPage(prev=>prev+1);
  }

  const handlePrevious=()=>{
     if(page===1){
       return;
     }
     setPage(prev=>prev-1);
    }
    
    
    useEffect(()=>{
      fetchProductData();
    },[page])
    
    // console.log(search)
   
    const handleOnChange=(e)=>{

      const {value} = e.target
      setSearch(value)
      setPage(1)

  }

  useEffect(()=>{
    //this is to prevent fetching every time when i write a char
    let flag = true;

      const interval= setTimeout(()=>{
        if(flag){
        fetchProductData()
        flag=false
        }
      },300)

      return ()=>{
        clearTimeout(interval)
      }
  },[search])

  return (
        <section className=''>
      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className=' font-semibold'>Product</h2>
        <div className='h-full max-w-56 w-full min-w-24 ml-auto  bg-blue-50 px-4 flex items-center gap-3 py-2  rounded  border focus-within:border-primary-200'>
          <IoSearchOutline size={25}/>
          <input
            type='text'
            placeholder='Search product here...'
            className='h-full w-full outline-none bg-transparent'
            onChange={handleOnChange}
            value={search}
          />
        </div>
      </div>
      {
         loading && 
         <Loading/>
      }
    
    <div className='p-4 bg-blue-50'>
      <div className='min-h-[60vh]'>
    <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 '>

      {
        productData?.map((p,index)=>{
          return (
            <ProductCardAdmin data={p} fetchProductData={fetchProductData}/>
          )
        })
      }
      </div>
      </div>
        

      <div className='flex justify-between my-4'>
        <button onClick={handlePrevious} className='border border-primary-200 px-4 py-1 hover:bg-primary-200'>Previous</button>
        <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
        <button onClick={handleNext} className='border border-primary-200 px-4 py-1 hover:bg-primary-200'>Next</button>
      </div>
    </div>

   
      </section>
  )
}

export default ProductAdmin