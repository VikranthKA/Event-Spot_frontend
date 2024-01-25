import {applyMiddleware,createStore,combineReducers} from "redux"
import {thunk} from "redux-thunk"
import userReducer from "../react-redux/reducer/userReducer"
import categoryReducer from "../react-redux/reducer/categoryReducer"

const configureStore = ()=>{
    const store  = createStore(combineReducers({

        user: userReducer,
        category: categoryReducer
        
    }),applyMiddleware(thunk))
    return store
}

export default configureStore