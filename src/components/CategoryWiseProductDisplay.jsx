import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../Utils/AxiosToastError'
import Axios from '../Utils/Axios'
import SummaryAPi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { validURLConvert } from '../Utils/ValidURLConvert'

function CategoryWiseProductDisplay({ id, name }) {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const loadingCardNumber = new Array(6).fill(null)
    const containerRef = useRef()

    const subCategoryData = useSelector(state => state.product.allSubCategory)

    const fetchCategoryWiseProduct = async () => {
        try {
            setloading(true);
            const response = await Axios({
                ...SummaryAPi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response;

            if (responseData.success) {
                setData(responseData.data)
            }


        } catch (error) {
            AxiosToastError(error)
        }
        finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }
    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }


  


  const handleRedirectProductListpage = (id,name)=>{
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      const url = `/${validURLConvert(name)}-${id}/${validURLConvert(subcategory.name)}-${subcategory._id}`
   
      return url;
  }

const [redirectURL, setRedirectURL] = useState('')

    useEffect(() => {
    if (subCategoryData.length > 0) {
        const url = handleRedirectProductListpage(id, name)
        setRedirectURL(url)
    }
    }, [subCategoryData, id, name])



    return (
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={redirectURL} className='text-green-600 hover:text-green-400'>See All</Link>
            </div>
            <div className='relative flex items-center'>
                <div className='flex gap-4 md:gap-6 lg:gap-10 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                    {loading &&
                        loadingCardNumber.map((_, idx) => {
                            return (
                                <CardLoading key={idx + "CategoryWiseProductDisplay"} />
                            )
                        })
                    }

                    {
                        data.map((p, idx) => {
                            return (
                                <CardProduct data={p} key={p._id + "CategoryWiseProductDisplay"} />
                            )
                        })
                    }


                </div>
                <div className='w-full left-0 right-0 container mx-auto px-2 absolute  justify-between max-w-full hidden lg:flex'>
                    <button onClick={handleScrollLeft} className='z-relative bg-white shadow-lg p-2 rounded-full text-lg  hover:bg-gray-100'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-100'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay