import React,{useEffect} from 'react'
import { ToastContainer } from 'react-bootstrap'
import { config } from '../../components/Api_Resources/config'
import axios from '../../components/Api_Resources/axios'
import {Link} from "react-router-dom"

function Success() {
  useEffect(()=>{
    (async()=>{
      try{
        const stripeId = localStorage.getItem("stripeId")
        console.log(stripeId)
        const response = await axios.put("/api/booking/update-payment",{stripeId},config)
        if(response) localStorage.removeItem("stripeId")
        


      }catch(err){
        console.log(err)
        // toast.error(JSON.stringify(err))
      }
    })()
  },[])
  return (
    <div style={{backgroundImage: "url(https://eventpot.s3.ap-south-1.amazonaws.com/Default_TICKET_CONFIRM_SUCCESS_3.jpg)"}}>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <ToastContainer/>
    </div>
  );
  
}

export default Success