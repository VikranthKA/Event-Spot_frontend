//  import axios from "../../axios"
import axios from "../../components/Api_Resources/axios"

export const startGetEvents = ()=>{
    return async(dispatch)=>{
       
            try{
                const response = await axios.get(`/api/event`)
                dispatch(setEvents(response.data))
                console.log(response.data)
            }catch(err){
                console.log(err)
                alert(err)
            }
        
    }
}


const setEvents = (data)=>{
    console.log(data,"in userAction")
    return{
        type:"GET_ALL_EVENTS_BY_API",
        payload:data
    }
}