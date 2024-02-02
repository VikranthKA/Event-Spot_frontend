import axios from "../../components/Api_Resources/axios"
import { config, paymentConfig } from "../../components/Api_Resources/config"

export const startCreateBooking = (eventId,tickets)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/event/${eventId}/booking`,{ tickets} ,config)
            console.log(response.data,"i action")
            dispatch(setTicketBooked(response.data))

        }catch(err){
            console.log(err)
            alert(err)
            
        }
    }
}

const setTicketBooked =(data)=>{
    return{
        type:"SET_TICKET_BOOKED_TRUE",
        payload:data
    }
}
export const startPayment = (bookingId,card)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/booking/${bookingId}/payment`,{card},paymentConfig)
            dispatch(setStartBooking(response.data))   
        }catch(err){
            console.log(err)
        }
    }
}
const setStartBooking = (data)=>{
    return{
        type:"CREATE_PAYMENT_TRUE",
        paylaod:data
    }

}
export const startPaymentStatus = (bookingId,card)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post()
            console.log(response.data)
            dispatch(setUpadateStatus(response.data))   
        }catch(err){
            console.log(err)
        }
    }
}
const setUpadateStatus = (data)=>{
    return{
        type:"UPDATE_PAYMENT_TRUE",
        paylaod:data
    }

}
export const startPaymentDelete = (eventId,bookingId,card)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/event/${eventId}`,{bookingId,card},paymentConfig)
            dispatch(setStartBooking(response.data))   
        }catch(err){
            console.log(err)
        }
    }
}
const setPaymentDelate = (data)=>{
    return{
        type:"DELTE_PAYMENT_TRUE",
        paylaod:data
    }

}
