import { jwtDecode } from 'jwt-decode'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Organizer from './Organizer';
import Admin from './Admin';
import Customer from './Customer';
export default function UserProfile(){
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const initialRole = token ? jwtDecode(token).role: ""
  const [role,setRole] = useState(false)
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  useEffect(()=>{
    try{
      const {role} = jwtDecode(token);
      console.log(role)
      if (role==="Admin"){
        setRole(role);
        setIsLoggedIn(true)
      } else if(role==="Customer"){
        setRole(role)
        setIsLoggedIn(true)
      } else if(role==="Organiser"){
        setRole(role)
        setIsLoggedIn(true)
      }
    } catch(e){
      console.log("invalid or expired token")
    }
  },[token])
  return(
    <div>
      {role==="Admin" ? (
        <Admin/>
      ): null}

      {role==="Organiser" ? (
        <Organizer/>
      ): null}

      {role==="Customer" ? (
        <h1><Customer/></h1>
      ): null}
    </div>
  )
}
