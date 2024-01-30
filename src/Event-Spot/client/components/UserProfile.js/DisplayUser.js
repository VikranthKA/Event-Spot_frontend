import React from 'react'
import { useReducer } from 'react'
import { ProfileContext } from '../../ContextApi/Context'
import UserForm from './UserForm'
import ActualProfile from './ActualProfile';

  const reducer = (state, action) =>{
    switch (action.type) {
      case "SHOW_PROFILE":
        return { ...state, data: [state.data, action.payload]};
      default: 
        return { ...state }
    }
  };

  const Container = () =>{
    const [tasks, dispatch] = useReducer(reducer, { data: []});
  
  return(
    <ProfileContext.Provider value={{ tasks: tasks, dispatch: dispatch }}>
      <UserForm/>
    </ProfileContext.Provider>
  )
  }
  export default Container