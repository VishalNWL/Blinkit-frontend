import SummaryAPi from "../common/SummaryApi"
import Axios from "../Utils/Axios"

const UploadImage = async (image)=>{
  try {
    const formData = new FormData()
    formData.append('image',image)
     const response = await Axios({
        ...SummaryAPi.uploadImage,
        data:formData
     })


     return response

  } catch (error) {
    return error
  }
}

export default UploadImage