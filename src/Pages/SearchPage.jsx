import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import AxiosToastError from '../Utils/AxiosToastError'
import Axios from '../Utils/Axios'
import SummaryAPi from '../common/SummaryApi'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation, useParams } from 'react-router-dom'
import noData from '../assets/nothing here yet.webp'

function SearchPage() {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(true)
  const loadingArrayCard= new Array(10).fill(null)
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(1)
  const params = useLocation();

  const searchText=params?.search?.slice(3);

  const fetchData=async()=>{
     try {

        const response = await Axios({
          ...SummaryAPi.searchProduct,
          data:{
            search:searchText,
            page:page
          }
        })

        const {data:responseData} = response
       
        console.log(responseData)
        if(responseData.success){
          if(responseData.page==1){
            setData(responseData.data)
          }
          else{
              setData((prev)=>{
                return [
                  ...prev,
                  ...responseData.data
                ]
              })
          }
          setTotalPage(responseData.totalPage)
        }
     } catch (error) {
        AxiosToastError(error||error.message||"Something went wrong")
        // console.log(error)
     }
     finally{
      setLoading(false)
     }
  }

  useEffect(()=>{
    fetchData()
  },[page,searchText])

  const handleFetchMore=()=>{
    if(totalPage>page){
       setPage(prev=>prev+1)
    }
  }

  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4'>
        <p className='font-bold'>Search Result: {data.length}</p>

          <InfiniteScroll 
            dataLength={data.length}
            hasMore={true}
            next={handleFetchMore}
          >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-5 py-4'>
          
          {
            data.map((p,idx)=>{
              return (
                 <CardProduct data={p} key={p._id + "SearchProduct"}/>
              )
            })
          }




          {/*Loading data*/}
          {
            loading && (
              loadingArrayCard.map((_,index)=>{
                return(
                  <CardLoading key={'loadingsearchpage'+index}/>
                )
              })
            )
          }
        </div>
          </InfiniteScroll>
                    {
            //no data
             !data[0] && !loading && (
              <div className='flex flex-col justify-center w-full mx-auto items-center'>
                 <img
                   src={noData}
                   className='w-full h-full max-w-xs max-h-xs'
                 />
                 <p className='font-semibold my-2'>No Product Found</p>
              </div>
             )
          }
      </div>
    </section>
  )
}

export default SearchPage