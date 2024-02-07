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
import RadiusEventDis from '../Event/RadiusEventDis';
import ViewHisEvents from '../ProfileHelpers/ViewHisEvents';
import { jwtDecode } from 'jwt-decode';



function reverseLatLon(arr) {
  return [arr[1], arr[0]];
}


function EventInMap() {
  const eventData = useSelector((state) => state.events)
  const [radius, setRadius] = useState(500);
  const [lonlat, setLonLat] = useState([]);
  const [center, setCenter] = useState([]);
  const {raduisEvents,handleGeoWithinEvents} = useContext(MyContext)
  const dispatch = useDispatch();
  const {userData} = useContext(MyContext)
  

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
    name: 'User',
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

  const handleRadiusChange = ()=>{
    handleGeoWithinEvents(radius, lonlat[1], lonlat[0])

  }

  return (
    <div className="div-container">


      {center.length > 0 ? (
        <div>
        <MapContainer center={lonlat} zoom={7} style={{ height: '400px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={lonlat} radius={radius} />

          <Marker position={lonlat} icon={userIcon}>
            <Popup >{user.name}</Popup>
          </Marker>
          
          {(raduisEvents.length>=0 ? raduisEvents: eventData)?.map((event) => (
            <Marker
              key={event._id}
              position={reverseLatLon(event.location.coordinates)}
              icon={eventIcon}
            >
              <Popup >{event.title }<br/><Link to={`/event-info/${event._id}`}>View More</Link></Popup>

           </Marker>
          ))}
        </MapContainer>
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


        </div>
        
      ) : (
        <p>Loading map...</p>
      )}

      <div>
        {userData.role=="Organiser" ?  <ViewHisEvents/> :<div>
      <div>
        <RadiusEventDis/>
      </div>
      <div className="EventDisplay">
        <EventCardsDisplay/>

      </div>
          
          </div>}
      </div>
    </div>
  );
}

export default EventInMap;
