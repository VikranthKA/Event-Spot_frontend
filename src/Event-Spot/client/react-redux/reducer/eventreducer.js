const eventInitialState = []
const eventReducer = (state=eventInitialState,action)=>{
    switch(action.type){
        case "GET_ALL_EVENTS_BY_API":{
            return [...action.payload]
        }
        default:{
            return [...state]
        }
    }
}




export default eventReducer