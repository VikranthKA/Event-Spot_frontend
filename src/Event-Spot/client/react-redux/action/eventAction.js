import axios from "../../components/Api_Resources/axios"
import { fileConfig } from "../../components/Api_Resources/config"
import {toast} from 'react-toastify'

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

export const startUpdateEvent = (eventId,eventFormData)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/event/${eventId}`, eventFormData, fileConfig)
            dispatch(setUpdateEvents(response.data))

        }catch(err){
            console.log(err)
            alert(err,"Cannot create a Event")
        }
    }
}

const setUpdateEvents =(data)=>{
    return {
        type:"UPDATE_EVENT_AFTER_BOOKING",
        payload:data
    }
}
export const startDeleteEvent = (eventId,eventFormData)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/event/${eventId}`, eventFormData, fileConfig)
            dispatch(setDeleteEvents(response.data))
            toast.success("Event Created Successfully")

        }catch(err){
            console.log(err)
            alert(err,"Cannot create a Event")
        }
    }
}

const setDeleteEvents =(data)=>{
    return {
        type:"DELETE_EVENT",
        payload:data
    }
}

