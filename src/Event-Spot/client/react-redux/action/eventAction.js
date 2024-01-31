import axios from "../../components/Api_Resources/axios"
import { fileConfig } from "../../components/Api_Resources/config"

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

//Creating the event and updating in the event store
export const startCreateEvent = (eventFormData)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post('/api/event', eventFormData, fileConfig)
            dispatch(setCreateEvents(response.data))

        }catch(err){
            console.log(err)
            alert(err,"Cannot create a Event")
        }
    }
}

const setCreateEvents =(data)=>{
    return {
        type:"CREATE_NEW_EVENT",
        payload:data
    }
}