import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams} from 'react-router-dom'
import Axios from '../Utils/Axios'
import SummaryAPi from '../common/SummaryApi';
import AxiosToastError from '../Utils/AxiosToastError';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { validURLConvert } from '../Utils/ValidURLConvert';

function ProductListPage() {
  const params = useParams();
  const [data,setData]= useState([]);
  const [page,setPage]=useState(1);
  const [loading,setloading]=useState(false);
  const [totalPage,setTotalPage]=useState(1);
  const subCategory = params.subCategory.split("-")
  const subCateogyrName = subCategory?.slice(0,subCategory?.length-1)?.join(" ")
  const AllSubCategory = useSelector(state=>state.product.allSubCategory)

const categoryId = useMemo(() => {
  return params.category?.split("-").pop();
}, [params.category]);

const subCategoryId = useMemo(() => {
  return params.subCategory?.split("-").pop();
}, [params.subCategory]);


  const [DisplaySubCategory,setDisplaySubCategory]=useState([])
 
  
  const fetchProductdata=async()=>{
    
  
         try {
           setloading(true)
           const response = await Axios({
            ...SummaryAPi.getProductByCategoryAndSubCategory,
            data:{
              categoryId:categoryId,
              subCategoryId:subCategoryId,
              page:page,
              limit:8
            }
           })

           const {data:responseData}= response;
            
        if (responseData.success) {
          if (page === 1) {
            setData(responseData.data.data);
          } else {
            setData(prev => [...prev, ...responseData.data.data]);
          }
          setTotalPage(responseData.data.dataCount);
        }


         } catch (error) {
            AxiosToastError(error)
         }
         finally{
          setloading(false)
         }
  }

  useEffect(() => {
  setData([]); // clear old products
  setPage(1);
  fetchProductdata();
}, [categoryId, subCategoryId]);


  useEffect(()=>{
    fetchProductdata()
    console.log(data)
   
  },[params])

 useEffect(()=>{
    const sub = AllSubCategory.filter(s=>{
       const filterData = s.category.some(el=>{
         return el._id=== categoryId
       })
       return filterData ? filterData:null
    })
    console.log(sub)
    setDisplaySubCategory(sub);
 },[params,AllSubCategory])


  return (
    <section className='sticky top-24 lg:top-20'>
        <div className='container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
            {/*Sub Category*/}
            <div className='min-h-[88vh] p-2 grid gap-1 shadow-md max-h-[88vh] overflow-y-scroll scrollbarCustom bg-white py-4'>
               {
                 DisplaySubCategory.map((s,idx)=>{
                 
                  const link = `/${validURLConvert(s?.category[0].name)}-${s?.category[0]?._id}/${validURLConvert(s.name)}-${s._id}`

                    return (
                      <Link to={link} key={s._id} className={`w-full p-2 bg-white -mt-3 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4  cursor-pointer border-b ${subCategoryId===s._id ? "bg-green-200":""} hover:bg-green-100`}>
                         <div className='w-fit mx-auto lg:mx-0 max-w-28 bg-white rounded  box-border cursor-pointer'>
                            <img
                              src={s.image}
                              alt='subCategory'
                              className='w-14 lg:w-12 h-full lg:h-14 object-scale-down'
                            />
                         </div>
                         <p className='text-xs lg:mt-0 text-center lg:text-base lg:text-left'>{s.name}</p>
                      </Link>
                    )
                 })
               }
            </div>

            {/*Product*/}
            <div className='sticky top-20'>
              <div className='bg-white shadow-md p-4 z-10'>
                  <h3 className='font-semibold'>{subCateogyrName}</h3>
              </div>
              <div className=''>
                <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
                  <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-4 px-0 mx-0 '>
                  {
                    data.map((p,index)=>{
                      return (
                        <CardProduct 
                        data={p} 
                        key={p._id + "CategoryWiseProduct"} />
                      )
                    })
                  }
                </div>
                </div>
                {
                  loading && (
                      <Loading/>
                  )
                }
              </div>
            </div>
        </div>
    </section>
  )
}

export default ProductListPage