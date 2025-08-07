import Axios from  "./Axios"
import SummaryAPi from "../common/SummaryApi"
const fetchUserDetails =async ()=>{
    try {

        const response = await Axios({
            ...SummaryAPi.userDetails
        })

        return response
        
    } catch (error) {
        console.log(error)
    }

}


export default fetchUserDetails