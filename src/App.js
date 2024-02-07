import React, { useEffect ,useReducer,useState} from 'react'
import {Routes,Route,Link} from 'react-router-dom' 
import './App.css'
import { MyContext } from './Event-Spot/client/ContextApi/Context'
import DisplayUser from './Event-Spot/client/components/UserProfile.js/DisplayUser'
import Darkmode from './Event-Spot/client/components/Z_Dark_Mode/Darkmode'
import Map from './Event-Spot/client/components/Location/Map'
import CreateBookingInfo from './Event-Spot/client/components/Booking/Qr-Component/CreateBookingInfo'
import Test from './Event-Spot/client/components/Location/Test'
import MapWithPolyline from './Event-Spot/client/components/Location/MapWithPolyline'
import EventInfo from './Event-Spot/client/components/Event/EventInfo'
import TicketBook from './Event-Spot/client/components/Event/TicketBook'
import Create from './Event-Spot/client/components/Category/Create'
import Header from './Event-Spot/client/components/Layout/Header'
import Home from './Event-Spot/client/pages/Home'
import Register from './Event-Spot/client/components/UserAuthenticate.js/Register'
import Login from './Event-Spot/client/components/UserAuthenticate.js/Login'
import UserProfile from './Event-Spot/client/components/UserProfile.js/UserProfile'
import EventForm from './Event-Spot/client/components/Event/EventForm'
import EventInMap from './Event-Spot/client/components/Location/EventInMap'
import Success from './Event-Spot/client/components/Booking/Payment/Success'
import Cancel from './Event-Spot/client/components/Booking/Payment/Cancel'
import axios from './Event-Spot/client/components/Api_Resources/axios'
import UserForm from './Event-Spot/client/components/UserProfile.js/UserForm'
import AllEvents from './Event-Spot/client/components/Event/AllEvents'
import ApprovedList from './Event-Spot/client/components/Event/ApprovedList'
import { ToastContainer, toast } from 'react-toastify'

function geoWithin(state,action){
  switch(action.type){
    case "GET_ALL_RADIUSEVENT_BY_API_TRUE" :{
      return action.payload
    }
    default :{
      return [...state]
    }
  }
}

const App = () => {
  const [raduisEvents,dispatch] = useReducer(geoWithin,[])
  const [searchQuery,setSearchQuery] = useState("")

  const handleGeoWithinEvents = async(radius,lon,lat) =>{
    try{
        const response = await axios.get(`/api/event/${radius}/${lon}/${lat}`)
        console.log(response.data)
        dispatch(
          {
            type:"GET_ALL_RADIUSEVENT_BY_API_TRUE",
            payload:response.data
          }
        )
        
    }catch(err){
      console.log(err)
        toast.error(err.response.data.err)
    }
  }

  useEffect(()=>{
    console.log("radius",raduisEvents)
  },[raduisEvents])

  return (
    <div>

      
    <MyContext.Provider value={{raduisEvents,handleGeoWithinEvents,searchQuery,setSearchQuery}}>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/user-profile' element={<UserProfile/>}/>
          <Route path='/event-form' element={<EventForm/>}/>
          <Route path='/event-in-map' element={<EventInMap style={{ height: '100vh' }}/>}/>
              {/* <div style={{height:"100vh"}}><EventInMap/></div> */}
          <Route path='/event-info/:eventId' element={<EventInfo/>}/>
          <Route path='/event-booking/:eventId' element={<TicketBook/>}/>
          <Route path='/show-QrCode' element={<CreateBookingInfo/>}/>
          <Route path="/success" element={<Success/>}/>
          <Route path="/cancel" element={<Cancel/>}/>
          <Route path="/edit-profile" element={<UserForm/>}/>
          <Route path="/all-events" element={<AllEvents/>}/>
          <Route path="/approved-list" element={<ApprovedList/>}/>

      </Routes>
      <ToastContainer/>
    </MyContext.Provider>
    </div>
  )
}
export default App

