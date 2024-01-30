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
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import eventImage from '../Utils/icon.png';
import userImage from '../Utils/userIcon.png';
import { startRaduisEvents, startGetEvents } from '../../react-redux/action/eventAction';
import 'leaflet/dist/leaflet.css'
import EventCardsDisplay from '../Event/EventCardsDisplay';


function reverseLatLon(arr) {
  return [arr[1], arr[0]];
}

function EventInMap() {
  const eventData = useSelector((state) => state.events);
  const [radius, setRadius] = useState(500);
  const [lonlat, setLonLat] = useState([]);
  const [center, setCenter] = useState([]);
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
    iconSize: [38, 38],
  });

  const handleEventInfo = (id) => {
    console.log(id);
    navigate(`/event-info/${id}`);
  };

  const handleRadiusChange = ()=>{
    //add set time out
    dispatch(startRaduisEvents(radius, lonlat[1], lonlat[0]));

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
      <p>Radius: {radius} meters</p>

      {center.length > 0 ? (
        <MapContainer center={[20.593684, 78.96288]} zoom={4} style={{ height: '400px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={lonlat} radius={radius} />

          <Marker position={lonlat} icon={userIcon}>
            <Popup >{user.name}</Popup>
          </Marker>

          {eventData?.map((event) => (
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

// import './EventInMap.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import eventImage from '../Utils/icon.png';
// import userImage from '../Utils/userIcon.png';
// import { startRaduisEvents, startGetEvents } from '../../react-redux/action/eventAction';

// function reverseLatLon(arr){
//   return [arr[1],arr[0]]
// }

// function EventInMap() {
//   const eventData = useSelector((state) => state.events);
//   const [radius, setRadius] = useState(500);
//   const [lonlat, setLonLat] = useState([]);
//   const [center, setCenter] = useState([]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const success = (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log(latitude, longitude);
//       setCenter([latitude, longitude]);
//       setLonLat([latitude, longitude]);
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
//     if(radius==500 || radius>=5000 || radius>=50000)
//     dispatch(startRaduisEvents(radius, lonlat[1], lonlat[0]))
//   }, [radius, lonlat])

//   // const handleRadiusChange = ()=>{
//   //   dispatch(startRaduisEvents(radius, lonlat[1], lonlat[0]))

//   // }

//   useEffect(() => {
//     dispatch(startGetEvents());
//   }, []); 

//   const user = {
//     name: 'Selva',
//     coordinates: [20, 89],
//   };

//   const eventIcon = new Icon({
//     iconUrl: eventImage,
//     iconSize: [38, 38],
//   });

//   const userIcon = new Icon({
//     iconUrl: userImage,
//     iconSize: [38, 38],
//   });
//   const handleEventInfo = (id) => {
//     console.log(id)
//     navigate(`/event-info/${id}`)
//   }

//   return (
//     <div className="div-container">
//       <input
//         type="range"
//         min="100"
//         max="500000"
//         step="50"
//         value={radius}
//         onChange={(e) => setRadius(parseInt(e.target.value, 10))}
//       />
//       <p>Radius: {radius} meters</p>

//       <MapContainer center={center.length > 0 ? center : [0, 0]} zoom={13} style={{ height: '400px' }}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Circle center={lonlat.length > 0 ? lonlat : [0, 0]} radius={radius} />

//         <Marker position={lonlat} icon={userIcon}>
//           <Popup>{user.name}</Popup>
//         </Marker>

//         {eventData?.map((event) => (
//           <Marker
//             key={event._id}
//             position={reverseLatLon(event.location.coordinates)}
//             icon={eventIcon}
//             onClick={() => handleEventInfo(event._id)}
//           >
//             <Popup onClick={() => handleEventInfo(event._id)}>{event.title}</Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }

// export default EventInMap;





// // import React, { useEffect, useState } from 'react';
// // import 'leaflet/dist/leaflet.css';
// // import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
// // import axios from '../Api_Resources/axios';
// // import { latLng } from 'leaflet';
// // import  {useNavigate } from 'react-router-dom' 
 
// // function EventInMap() {
// //   const [radius, setRadius] = useState(500); 
// //   const [userLocation, setUserLocation] = useState([])
// //   const [events, setEvents] = useState([])

// //   const navigate = useNavigate()

// //   const handleRadiusChange = (event) => {
// //     setRadius(parseInt(event.target.value, 10));
// //   };

// //   useEffect(() => {
// //     const success = (position) => {
// //       const { latitude, longitude } = position.coords
// //       setUserLocation([longitude,latitude])
// //       console.log(userLocation,"location")

// //       fetchEventsFromBackend([latitude, longitude]);
// //     };

// //     const error = (error) => {
// //       console.error(error);
// //     };

// //     if ('geolocation' in navigator) {
// //       navigator.geolocation.getCurrentPosition(success, error);
// //     } else {
// //       console.error('Geolocation is not supporting in this browser');
// //     }
// //   }, [])



// //   const fetchEventsFromBackend = async (userLocation) => {
// //     try {
// //       // const response = await fetch(`/api/events?latitude=${userLocation[0]}&longitude=${userLocation[1]}&radius=${radius}`);
// //       const response =await axios.get(`/api/event/${radius}/${userLocation[1]}/${userLocation[0]}`)

// //       const data = await response.json();
// //       setEvents(data)
// //     } catch (error) {
// //       console.error('Error fetching events:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div>
// //         <input type="range" min="100" max="5000" step="50" value={radius} onChange={handleRadiusChange}/>

// //         <p>Latitude: {userLocation[1]}, Longitude: {userLocation[0]}, Radius: {radius} meters</p>

// //         <MapContainer center={userLocation.length > 0 ? userLocation : [0, 0]} zoom={13} style={{ height: '400px', width: '100%' }}>
// //           <TileLayer
// //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //           />
// //           <Circle center={userLocation.length > 0 ? latLng(userLocation) : [0, 0]} radius={radius} />

// //           {events.map((event) => (
// //             <Marker key={event._id} position={[event.latitude, event.longitude]} onClick={()=>navigate(`/event/${event._id}`)}>
// //               <Popup>{event.name}</Popup>
// //             </Marker>
// //           ))}
// //         </MapContainer>
// //       </div>
// //     </div>
// //   );
// // }

// // export default EventInMap;
