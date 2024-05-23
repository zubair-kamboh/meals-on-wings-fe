import React, { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export const DeliveryMap = () => {
  const shouldRenderMap = true;

  // Define the two locations
  const locations = [
    { lat: -33.860664, lng: 151.208138, label: 'Location 1' },
    { lat: -33.870664, lng: 151.218138, label: 'Location 2' }
  ];

  if (shouldRenderMap) {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <h1>Current Delivery</h1>
        <APIProvider apiKey={'AIzaSyCg7sLR3nrC8cAwg5Awyhs2CHQG68aC3fg'} onLoad={() => console.log('Maps API has loaded.')}>
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            onCameraChanged={(ev) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }>
            {locations.map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                label={location.label}
              />
            ))}
          </Map>
        </APIProvider>
      </div>
    );
  } else {
    console.log('no map');
    return null; // Return null instead of undefined
  }
};
