const eventInitialState = []
const eventReducer = (state=eventInitialState,action)=>{
    switch(action.type){
        case "GET_ALL_EVENTS_BY_API":{
            return [...action.payload]
        }
        case "GET_ALL_RADIUSEVENT_BY_API_TRUE":{
            return [...action.payload]
        }
        case "CREATE_NEW_EVENT":{
            return [...action.payload,...state]
        }
        default:{
            return [...state]
        }
    }
}




export default eventReducer