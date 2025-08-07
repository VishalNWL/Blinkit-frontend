import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../Utils/Axios'
import AxiosToastError from '../Utils/AxiosToastError'
import SummaryAPi from '../common/SummaryApi'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'
import { DisplayPriceInRupees } from '../Utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { pricewithDiscount } from '../Utils/PriceWithDiscount'
import { AddToCartButton } from '../components/AddToCartButton'

function ProductDisplayPage() {
  const params = useParams()
  let productId = params.product.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(0)
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      setLoading(true)

      const response = await Axios({
        ...SummaryAPi.getProductDetails,
        data: {
          productId: productId
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }

    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])


  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 bg-white'>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh]  rounded min-h-56 max-h-56 h-full w-full'>
          <img
            src={data.image[image]}
            className='w-full h-full object-scale-down'
            alt='image'
          />
        </div>
        <div className='flex items-center justify-center gap-3 my-2'>
          {
            data.image.map((img, idx) => {
              return (
                <div className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${idx === image && 'bg-slate-300'}`} key={idx + "image"}>

                </div>
              )
            })
          }
        </div>
        <div className='grid relative'>
          <div ref={imageContainer} className='flex gap-4  relative z-10 w-full overflow-x-auto scrollbar-none'>
            {
              data.image.map((img, idx) => {
                return (
                  <div className='w-20 h-20 min-h-20 min-w-20  cursor-pointer shadow-md' key={idx + "image"}>
                    <img
                      src={img}
                      className='w-full h-full object-scale-down'
                      alt="mini product"
                      onClick={() => { setImage(idx) }}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className='w-full h-full -ml-3 flex justify-between absolute items-center'>
            <button onClick={handleScrollLeft} className='bg-white p-1 z-10 relative rounded-full shadow-lg'>
              <FaAngleLeft />
            </button>
            <button onClick={handleScrollRight} className='bg-white p-1 z-10 relative rounded-full shadow-lg'>
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className='my-4 hidden lg:grid gap-3 '>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element,idx)=>{
              return (
                  <div>
                    <p className='font-semibold'>{element}</p>
                    <p className='text-base'>{data?.more_details[element]}</p>
                  </div>                
              )
            })
          }
        </div>
      </div>
      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p className=''>{data.unit}</p>
        <Divider />
        <div>
          <p className=''>Price:</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}</p>
            </div>
            {
              data.discount && (
                <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
              )
            }
            {
              data.discount && (
                <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}% <span className='text-base text-neutral-500'>discount</span></p>
              )
            }
          </div>
        </div>

        {
          data.stock === 0 ? (
            <p className='text-lg text-red-500 my-2'>Out of Stock</p>
          ) : (
            // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
             <div className='my-4'>
               <AddToCartButton data={data}/>
             </div>
          )
        }


        <h2 className='font-semibold '>Why shop blinkit?</h2>
        <div>
          <div className='flex items-center gap-4'>
            <img
              src={image1}
              alt='superfast delivery'
              className='w-20 h-20 '
            />
            <div className='text-sm'>
              <div className='font-semibold'>Superfast Delivery</div>
              <p>Get your order deliverd to your doorsteps from darkstore near you.</p>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <img
              src={image2}
              alt='Best Price offers'
              className='w-20 h-20 '
            />
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices and Offers</div>
              <p>Best price destination with offers directly from the manufacturers.</p>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <img
              src={image3}
              alt='Wide Assortment'
              className='w-20 h-20 '
            />
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>Choose from 5000+ products across food peronal care, household & other category .</p>
            </div>
          </div>
        </div>
        {/*only mobile*/}
      </div>
    </section>
  )
}

export default ProductDisplayPage