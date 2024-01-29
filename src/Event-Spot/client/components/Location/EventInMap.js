import './EventInMap.css'
import React, { useEffect,useState } from 'react'
import {MapContainer,TileLayer,Marker,Popup,Circle} from 'react-leaflet'
import { Icon ,DivIcon, divIcon,latLng} from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import {useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import eventImage from "../Utils/icon.png"
import userImage from "../Utils/userIcon.png"
import axios from '../Api_Resources/axios'
import { startGetEvents ,startRaduisEvents} from '../../react-redux/action/eventAction'



function EventInMap() {
const eventData = useSelector((state)=>{
  return state.events
})

const [location,setLocation] =useState([12,89])
const [radius, setRadius] = useState(500); // Initial radius in meters
const [lonlat, setLonLat] = useState([]);

const handleRadiusChange = (event) => {
  setRadius(parseInt(event.target.value, 10));
};
const navigate =useNavigate()
const  dispatch = useDispatch()

useEffect(() => {
  const success = (position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
    setCenter([latitude, longitude]); // Use an array to set the center
    setLonLat([latitude, longitude]); // Use an array to set lonlat
  };

  const error = (error) => {
    console.error(error);
  }

  // Check if the Geolocation API is supported by the browser
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.error('Geolocation is not supported by your browser');
  }
}, []);
  useEffect(()=>{
    dispatch(startRaduisEvents(radius,lon,lat))
  },[radius])
  useEffect(()=>{
    dispatch(startGetEvents())
  },[location])

  const user = {
    name:"Selva",
    coordinates:[20,89]
  }

  const eventIcon = new Icon({ 
  iconUrl:eventImage,
  iconSize:[38,38]
  })

  const userIcon = new Icon({ 
    iconUrl:userImage,
    iconSize:[38,38]
    })


// const createCustomCluster = (cluster)=>{
//   return new divIcon({
//     html:`<div class="cluster-icon">${cluster.getChildCount()}</div>`,
//     // iconSize:point(33,33,true),
//     className:"custom-marker-cluster"
//   })
// }

function reverselatlon(arr){
  return [arr[1],arr[0]]
}

  return (
    <div className='div-container'>
      <input type="range" min="100" max="500000"  step="50" value={radius} onChange={handleRadiusChange}/>
        <p>Radius: {radius} meters</p>

<MapContainer center={[55,55]} zoom={13}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          
    />
    <Circle center={lonlat.length > 0 ? latLng(lonlat) : [0, 0]} radius={radius} />

    <Marker position={user.coordinates} icon={userIcon}>
      <Popup>
        {user.name}
      </Popup>

    </Marker>
    {/* <MarkerClusterGroup
    chunkedLoading
    iconCreateFunction={createCustomCluster}
    > */}

    {eventData?.map(event=>(
      
    <Marker position={event.location.coordinates} icon={eventIcon} onClick={() => navigate(`/event-info/${event._id}`)} >
      <Popup onClick={() => navigate(`/event-info/${event._id}`)}>
        {event.title}
      </Popup>
    </Marker>
    ))}
{/* </MarkerClusterGroup> */}
</MapContainer>
</div>
  )
}

export default EventInMap




// import React, { useEffect, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
// import axios from '../Api_Resources/axios';
// import { latLng } from 'leaflet';
// import  {useNavigate } from 'react-router-dom' 
 
// function EventInMap() {
//   const [radius, setRadius] = useState(500); 
//   const [userLocation, setUserLocation] = useState([])
//   const [events, setEvents] = useState([])

//   const navigate = useNavigate()

//   const handleRadiusChange = (event) => {
//     setRadius(parseInt(event.target.value, 10));
//   };

//   useEffect(() => {
//     const success = (position) => {
//       const { latitude, longitude } = position.coords
//       setUserLocation([longitude,latitude])
//       console.log(userLocation,"location")

//       fetchEventsFromBackend([latitude, longitude]);
//     };

//     const error = (error) => {
//       console.error(error);
//     };

//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(success, error);
//     } else {
//       console.error('Geolocation is not supporting in this browser');
//     }
//   }, [])



//   const fetchEventsFromBackend = async (userLocation) => {
//     try {
//       // const response = await fetch(`/api/events?latitude=${userLocation[0]}&longitude=${userLocation[1]}&radius=${radius}`);
//       const response =await axios.get(`/api/event/${radius}/${userLocation[1]}/${userLocation[0]}`)

//       const data = await response.json();
//       setEvents(data)
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <input type="range" min="100" max="5000" step="50" value={radius} onChange={handleRadiusChange}/>

//         <p>Latitude: {userLocation[1]}, Longitude: {userLocation[0]}, Radius: {radius} meters</p>

//         <MapContainer center={userLocation.length > 0 ? userLocation : [0, 0]} zoom={13} style={{ height: '400px', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Circle center={userLocation.length > 0 ? latLng(userLocation) : [0, 0]} radius={radius} />

//           {events.map((event) => (
//             <Marker key={event._id} position={[event.latitude, event.longitude]} onClick={()=>navigate(`/event/${event._id}`)}>
//               <Popup>{event.name}</Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// }

// export default EventInMap;
