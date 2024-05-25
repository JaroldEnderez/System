import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const LocationInput = ({ onLocationChange }) => {
  const [location, setLocation] = useState(null);

  const handleMapClick = (e) => {
    setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    onLocationChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          center={{ lat: 0, lng: 0 }}
          zoom={2}
          onClick={handleMapClick}
          mapContainerStyle={{ height: '400px', width: '100%' }}
        >
          {location && <Marker position={location} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationInput;
