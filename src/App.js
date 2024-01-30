import React, { useEffect } from 'react'
import {Routes,Route,Link} from 'react-router-dom' 
import './App.css'
import { MyContext } from './Event-Spot/client/ContextApi/Context'
import DisplayUser from './Event-Spot/client/components/UserProfile.js/DisplayUser'
import Darkmode from './Event-Spot/client/components/Z_Dark_Mode/Darkmode'
import Map from './Event-Spot/client/components/Location/Map'
import CreateBookingInfo from './Event-Spot/client/components/Booking/CreateBookingInfo'
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
import ActualProfile from './Event-Spot/client/components/UserProfile.js/ActualProfile'

const App = () => {
  
  return (
    <div>

      
    <MyContext.Provider value={{}}>
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
          <Route path='/profile' element={<ActualProfile/>}/>
      </Routes>
    </MyContext.Provider>
    </div>
  )
}
export default App

