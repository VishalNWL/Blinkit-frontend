import toast from "react-hot-toast"

const AxiosToastError =(error)=>{
  console.log(error.response.data)
  toast.error(error.response.data.message)

}

export default AxiosToastError