import { toast } from "react-toastify"
import axios from "../../components/Api_Resources/axios"
import { config, paymentConfig } from "../../components/Api_Resources/config"

export const startCreateBooking = (eventId,tickets)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/event/${eventId}/booking`,{ tickets} ,config)
            console.log(response.data,"i action")
            dispatch(setTicketBooked(response.data.booking))
            dispatch(updateEventAfterBooking(response.data.updatedEvent))
        }catch(err){
            console.log(err)
            alert(err)
            return{
                type:"CLEAR_BOOKING_IN_STATE"
            }
            
        }
    }
}

const setTicketBooked =(data)=>{
    return{
        type:"SET_TICKET_BOOKED_TRUE",
        payload:data
    }
}
export const setClearTicket =()=>{
    return{
        type:"CLEAR_BOOKING_IN_STATE"
    }
}

const updateEventAfterBooking = (data)=>{
    return {
        type:"UPDATE_EVENT_AFTER_BOOKING",
        payload:data
    }

}
export const startPayment = (bookingId,card)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`/api/booking/${bookingId}/payment`,{card},paymentConfig)
            console.log(response.data.id)
            dispatch(setStartBooking(response.data)) 
  
        }catch(err){
            console.log(err)
        }
    }
}
const setStartBooking = (data)=>{
    if(data){
        localStorage.setItem("stripeId",data.id)
        window.location = data.url
    }
    // return{
    //     type:"CREATE_PAYMENT_TRUE",
    //     paylaod:data
    // }

}
export const startPaymentStatus = (bookingId,card)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post()
            dispatch(setUpadateStatus(response.data))   
        }catch(err){
            toast.error(JSON.stringify(err.response.data.error))

            console.log(err)
        }
    }
}
const setUpadateStatus = (data)=>{

        //add the logic of the dont know
    
    // return{
    //     type:"UPDATE_PAYMENT_TRUE",
    //     paylaod:data
    // }

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
export const startCancelPayment = (eventId,bookingId,card)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.delete(`/api/booking/${bookingId}`,paymentConfig)
            dispatch(setCancelPayment(response.data))   
        }catch(err){
            toast.error(err.response.data.error)
            console.log(err)
        }
    }
}
const setCancelPayment = (data)=>{
    return{
        type:"DELTE_BOOKING_TRUE",
        paylaod:data
    }

}
