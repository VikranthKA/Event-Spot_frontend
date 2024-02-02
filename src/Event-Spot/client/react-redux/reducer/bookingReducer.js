const bookingInitialState = {}
const bookingReducer = (state=bookingInitialState,action)=>{
    switch(action.type){
        case "SET_TICKET_BOOKED_TRUE":{
            return {...state,...action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default bookingReducer