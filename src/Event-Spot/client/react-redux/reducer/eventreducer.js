const eventInitialState = []
const eventReducer = (state=eventInitialState,action)=>{
    switch(action.type){
<<<<<<< HEAD
        case "GET_ALL_EVENTS_BY_API":{
            console.log("Payload in reducer:", action.payload);
            return [...action.payload]
        }
        case "CREATE_NEW_EVENT":{
=======
        case "GET_ALL_EVENTS_BY_API":
            return action.payload
        
        case "CREATE_NEW_EVENT":
>>>>>>> bc95efedd3bde181ca4d1ae44fe51624a8745c67
            return [action.payload,...state]
        }case "UPDATE_EVENT_AFTER_BOOKING": {
            const updatedEvent = state.map((ele) => {
              if (ele._id ===  action.payload._id) {
                return {...action.payload, ...ele}
              } else {
                return ele
              }
            })
            return updatedEvent;
        }case "DELETE_EVENT":{
            const deleteEvent = state.filter((ele)=>ele._id !== action.payload)
            return deleteEvent
        }default:{
            return [...state]
        }
    }
}




export default eventReducer