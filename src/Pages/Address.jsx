import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddres from '../components/Address'
import {MdDelete, MdEdit} from 'react-icons/md'
import EditAddress from '../components/EditAddress'
import Axios from '../Utils/Axios'
import SummaryAPi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../Utils/AxiosToastError'
import { useGlobalContext } from '../provider/GlobalProvider'

function Addresses() {
  const addressList = useSelector(state=>state.addresses)
  const [openAddress,setOpenAddress]= useState(false)
  const [OpenEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({})
  const {fetchAddress} = useGlobalContext()

  const handleDisableAddress=async(id)=>{
         try {
          const resposne = await Axios({
            ...SummaryAPi.disableAddress,
            data:{
              _id:id
            }
          })

          if(resposne.data.success){
            toast.success("Address removed")
            if(fetchAddress){
              fetchAddress()
            }
          }
         } catch (error) {
           AxiosToastError(error)
         }
  }
  return (
    <div className=''>
      <div className='bg-white shadow-lg px-2 py-2 flex justify-between gap-4 item-center'>
        <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
        <button onClick={()=>{setOpenAddress(true)}} className='border border-primary-200 text-primary-200 hover:bg-primary-200 hover:text-black px-3 py-1 rounded-full'>
           Add Address
        </button>
      </div>
        <div className='bg-blue-50 p-2 grid gap-4'>
                           {
                            addressList.addresssList.map((address,index)=>{
                                return (
                                    
                                    <div key={address+index} className={`border rounded p-3 flex gap-3 bg-white ${!address.status && 'hidden'}`}>
                                     
                                        <div className='w-full'>
                                        <p>{address.address_line}</p>
                                        <p>{address.city}</p>
                                        <p>{address.state}</p>
                                        <p>{address.country} - {address.pincode}</p>
                                        <p>{address.mobile}</p>
                                        </div>
                                          <div className='grid gap-10'>
                                           <button onClick={()=>{
                                            setOpenEdit(true);
                                            setEditData(address)
                                           }} className='bg-green-200 p-1 rounded hover:text-white hover:bg-green-600'>
                                             <MdEdit/>
                                           </button>
                                           <button onClick={()=>{
                                            handleDisableAddress(address._id)
                                           }} className='bg-red-200 p-1 rounded hover:text-white hover:bg-red-600'>
                                            <MdDelete size={20}/>
                                           </button>
                                       </div>
                                    </div>
                                 
                                )
                            })
                           }
                    <div onClick={()=>setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center'>
                        Add Address
                    </div>
                        </div>

                    {
                      openAddress&&(
                        <AddAddres close={()=>setOpenAddress(false)}/>
                      )
                    }
                    {
                      OpenEdit && (
                        <EditAddress close={()=>setOpenEdit(false)} data={editData}/>
                      )
                    }
    </div>
  )
}

export default Addresses