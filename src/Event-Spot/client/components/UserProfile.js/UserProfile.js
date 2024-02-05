import { jwtDecode } from 'jwt-decode'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';
import Organizer from './Organizer';
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
    <div>
      {role==="Organiser" ? (
        <Organizer/>
      ): null}
    <div>
      {role==="Customer" ? (
        <Customer/>
      ): null}
    </div>
    </div>
    </div>
  )
}
