// import './EventInMap.css'
// import React, { useEffect,useState } from 'react'
// import {MapContainer,TileLayer,Marker,Popup,Circle} from 'react-leaflet'
// import { Icon ,DivIcon, divIcon,latLng} from 'leaflet'
// import MarkerClusterGroup from 'react-leaflet-cluster'
// import {useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import eventImage from "../Utils/icon.png"
// import userImage from "../Utils/userIcon.png"
// import axios from '../Api_Resources/axios'
// import { startGetEvents ,startRaduisEvents} from '../../react-redux/action/eventAction'

// function EventInMap() {
//   const eventData = useSelector((state) => {
//     return state.events;
//   });

//   const [coordinates, setCoordinates] = useState([12, 89]);
//   const [radius, setRadius] = useState(500);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const success = (position) => {
//       const { latitude, longitude } = position.coords;
//       setCoordinates([latitude, longitude]);
//     };

//     const error = (error) => {
//       console.error(error);
//     };

//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(success, error);
//     } else {
//       console.error('Geolocation is not supported by your browser');
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(startRaduisEvents(radius, coordinates));
//   }, [radius]);

//   useEffect(() => {
//     dispatch(startGetEvents());
//   }, [coordinates]);

//   const eventIcon = new Icon({ 
//   iconUrl:eventImage,
//   iconSize:[38,38]
//   })

//   const userIcon = new Icon({ 
//     iconUrl:userImage,
//     iconSize:[38,38]
//     })

//   return (
//     <div className='div-container'>
//       <input type="range" min="100" max="500000" step="50" value={radius} onChange={(e) => setRadius(parseInt(e.target.value, 10))} />
//       <p>Radius: {radius} meters</p>

//       <MapContainer center={coordinates} zoom={13}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Circle center={coordinates} radius={radius} />

//         <Marker position={coordinates} icon={userIcon}>
//           <Popup>
//             Your Location
//           </Popup>
//         </Marker>

//         {eventData?.map((event) => (
//           <Marker key={event._id} position={event.location.coordinates} icon={eventIcon} onClick={() => navigate(`/event-info/${event._id}`)}>
//             <Popup>
//               {event.title}
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }

// export default EventInMap;

// EventInMap.js

import './EventInMap.css';
import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import eventImage from '../Utils/icon.png';
import userImage from '../Utils/userIcon.png';
import { startRaduisEvents, startGetEvents } from '../../react-redux/action/eventAction';
import 'leaflet/dist/leaflet.css'
import EventCardsDisplay from '../Event/EventCardsDisplay';
import { MyContext } from '../../ContextApi/Context';


function reverseLatLon(arr) {
  return [arr[1], arr[0]];
}

function EventInMap() {
  const eventData = useSelector((state) => state.events);
  const [radius, setRadius] = useState(500);
  const [lonlat, setLonLat] = useState([]);
  const [center, setCenter] = useState([]);
  const {raduisEvents,handleGeoWithinEvents} = useContext(MyContext)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      setCenter([latitude, longitude]);
      setLonLat([latitude, longitude]);
    };

    const error = (error) => {
      console.error(error);
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  useEffect(() => {
    if (radius === 500 || radius >= 5000 || radius >= 50000) {
    }
  }, [radius, lonlat]);

  useEffect(() => {
    dispatch(startGetEvents());
  }, []);

  const user = {
    name: 'Selva',
    coordinates: [20, 89],
  };

  const eventIcon = new Icon({
    iconUrl: eventImage,
    iconSize: [38, 38],
  });

  const userIcon = new Icon({
    iconUrl: userImage,
    iconSize: [50, 50],
  });

  const handleEventInfo = (id) => {
    console.log(id);
    navigate(`/event-info/${id}`);
  };

  const handleRadiusChange = ()=>{
    handleGeoWithinEvents(radius, lonlat[1], lonlat[0])

  }

  return (
    <div className="div-container">
      <label htmlFor="radiusInput">Radius:</label>
      <input
        type="range"
        id="radiusInput"
        min="100"
        max="20000"
        step="50"
        value={radius}
        onBlur={handleRadiusChange}
        onChange={(e) => setRadius(parseInt(e.target.value, 10))}
      />
      <p>Radius: {radius} Meters</p>

      {center.length > 0 ? (
        <MapContainer center={lonlat} zoom={7} style={{ height: '400px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={lonlat} radius={radius} />

          <Marker position={lonlat} icon={userIcon}>
            <Popup >{user.name}</Popup>
          </Marker>
          {/* {raduisEvents.length!==0 ? raduisEvents : eventData} */}
          {eventData.map((event) => (
            <Marker
              key={event._id}
              position={reverseLatLon(event.location.coordinates)}
              icon={eventIcon}
            >
              <Popup >{event.title }<br/><Link to={`/event-info/${event._id}`}>View More</Link></Popup>

           </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
      <div className="EventDisplay">
        <EventCardsDisplay/>

      </div>
    </div>
  );
}

export default EventInMap;
