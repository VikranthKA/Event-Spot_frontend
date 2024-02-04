import React,{useEffect} from 'react'
import { config } from '../../Api_Resources/config'
import { ToastContainer } from 'react-bootstrap'
import axios from '../../Api_Resources/axios'

function Success() {
  useEffect(()=>{
    (async()=>{
      try{
        const stripeId = localStorage.getItem("stripeId")
        console.log(stripeId)
        const response = await axios.put("/api/booking/update-payment",{stripeId},config)
        if(response) localStorage.removeItem("stripeId")
        


      }catch(err){
        alert(err)
        // toast.error(JSON.stringify(err))
      }
    })()
  })
  return (
    <div>Success
      <ToastContainer/>
    </div>
  )
}

export default Success