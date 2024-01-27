import {applyMiddleware,createStore,combineReducers} from "redux"
import {thunk} from "redux-thunk"
import userReducer from "../react-redux/reducer/userReducer"
import categoryReducer from "../react-redux/reducer/categoryReducer"
import eventReducer from "../react-redux/reducer/eventreducer"

const configureStore = ()=>{
    const store  = createStore(combineReducers({

        user: userReducer,
        category: categoryReducer,
        events:eventReducer
        
    }),applyMiddleware(thunk))
    return store
}

export default configureStore