import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon, latLng } from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import eventImage from "../Utils/icon.png";
import userImage from "../Utils/userIcon.png";
import { startGetEvents, startRaduisEvents } from '../../react-redux/action/eventAction';

function EventInMap() {
  const eventData = useSelector((state) => {
    return state.events;
  });

  const [coordinates, setCoordinates] = useState([12, 89]);
  const [radius, setRadius] = useState(500);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setCoordinates([latitude, longitude]);
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
    dispatch(startRaduisEvents(radius, coordinates));
  }, [radius]);

  useEffect(() => {
    dispatch(startGetEvents());
  }, [coordinates]);

  const userIcon = new Icon({
    iconUrl: userImage,
    iconSize: [38, 38],
  });

  const eventIcon = new Icon({ 
  iconUrl:eventImage,
  iconSize:[38,38]
  })

  return (
    <div className='div-container'>
      <input type="range" min="100" max="500000" step="50" value={radius} onChange={(e) => setRadius(parseInt(e.target.value, 10))} />
      <p>Radius: {radius} meters</p>

      <MapContainer center={coordinates} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={coordinates} radius={radius} />

        <Marker position={coordinates} icon={userIcon}>
          <Popup>
            Your Location
          </Popup>
        </Marker>

        {eventData?.map((event) => (
          <Marker key={event._id} position={event.location.coordinates} icon={eventIcon} onClick={() => navigate(`/event-info/${event._id}`)}>
            <Popup>
              {event.title}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default EventInMap;