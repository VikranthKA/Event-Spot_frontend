const bookingInitialState = {}
const bookingReducer = (state=bookingInitialState,action)=>{
    switch(action.type){
        case "SET_TICKET_BOOKED_TRUE":{
            return {...state,...action.payload}
        }
        case "CLEAR_BOOKING_IN_STATE":{
            return {  }
        }
        default:{
            return {...state}
        }
    }
}

export default bookingReducer