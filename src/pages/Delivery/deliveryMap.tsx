import React, { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Polyline } from '@react-google-maps/api';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './../../firebase';
import './Delivery.css';

interface Delivery {
  id: string;
  delivery_cost: number;
  delivery_date_time: string;
  delivery_status: string;
  drone_assigned: string;
  drop_loc: { latitude: number; longitude: number };
  is_item_handed: boolean;
  is_item_picked: boolean;
  order: string;
  pick_loc: { latitude: number; longitude: number };
}

export const DeliveryMap = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [locations, setLocations] = useState<{ lat: number; lng: number; label: string }[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const originRef = useRef<HTMLInputElement>(null);
  const destiantionRef = useRef<HTMLInputElement>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const deliveriesCollection = collection(firestore, 'deliveries');
      const deliverySnapshot = await getDocs(deliveriesCollection);
      const deliveryList = deliverySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Delivery, 'id'>)
      }));
      setDeliveries(deliveryList);
    };

    fetchDeliveries();
  }, []);

  useEffect(() => {
    if (selectedDelivery) {
      const { pick_loc, drop_loc } = selectedDelivery;
      setLocations([
        { lat: pick_loc.latitude, lng: pick_loc.longitude, label: 'Pick-Up Location' },
        { lat: drop_loc.latitude, lng: drop_loc.longitude, label: 'Drop-Off Location' }
      ]);
      calculateDistance(pick_loc, drop_loc);
    }
  }, [selectedDelivery]);

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const delivery = deliveries.find(delivery => delivery.id === selectedId) || null;
    setSelectedDelivery(delivery);
  };

  const calculateDistance = (pickLoc: { latitude: number; longitude: number }, dropLoc: { latitude: number; longitude: number }) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (dropLoc.latitude - pickLoc.latitude) * (Math.PI / 180);
    const dLon = (dropLoc.longitude - pickLoc.longitude) * (Math.PI / 180);
    const lat1 = pickLoc.latitude * (Math.PI / 180);
    const lat2 = dropLoc.latitude * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    setDistance(distance);
  };

  // async function calculateRoute() {
  //   if (!originRef.current || !destiantionRef.current || originRef.current.value === "" || destiantionRef.current.value === "") {
  //     return;
  //   }
  //   const directionsService = new window.google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: originRef.current.value,
  //     destination: destiantionRef.current.value,
  //     travelMode: window.google.maps.TravelMode.DRIVING,
  //   });
  //   setDirectionsResponse(results);

  //   // Extract the route path from the results and update state
  //   const routePath = results?.routes[0]?.overview_path;
  //   if (routePath) {
  //     const routeCoordinates = routePath.map(point => ({ lat: point.lat(), lng: point.lng() }));
  //     setFlightRoute(routeCoordinates);
  //   }
  // }

  return (
    <div className="delivery-map-container">
      <h1>Current Delivery</h1>
      <select className="delivery-select" onChange={handleDeliveryChange} defaultValue="">
        <option value="" disabled>Select a delivery</option>
        {deliveries.map(delivery => (
          <option key={delivery.id} value={delivery.id}>
            {delivery.id}
          </option>
        ))}
      </select>

      {selectedDelivery && (
        <div className="delivery-info">
          {/* <p><strong>Order:</strong> {selectedDelivery.order}</p> */}
          <p><strong>Delivery Cost:</strong> ${selectedDelivery.delivery_cost}</p>
          <p><strong>Delivery Date and Time:</strong> {new Date(selectedDelivery.delivery_date_time).toLocaleString()}</p>
          <p><strong>Delivery Status:</strong> {selectedDelivery.delivery_status}</p>
          {/* <p><strong>Drone Assigned:</strong> {selectedDelivery.drone_assigned}</p> */}
          <p><strong>Item Picked:</strong> {selectedDelivery.is_item_picked ? 'Yes' : 'No'}</p>
          <p><strong>Item Handed:</strong> {selectedDelivery.is_item_handed ? 'Yes' : 'No'}</p>
          {distance && <p><strong>Distance:</strong> {distance.toFixed(2)} km</p>}
        </div>
      )}

      {locations.length > 0 && (
        <APIProvider apiKey={'AIzaSyCg7sLR3nrC8cAwg5Awyhs2CHQG68aC3fg'}>
          {deliveries.length === 0 ? (
            // Display a loading indicator while fetching deliveries
            <p>Loading deliveries...</p>
          ) : (
            <Map
              defaultZoom={13}
              defaultCenter={locations[0]}
              mapTypeControl={true}
              streetViewControl={false}
              fullscreenControl={true}
              onCameraChanged={(ev) => console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}
            >
              {locations.map((location, index) => (
                <Marker
                  key={index}
                  position={{ lat: location.lat, lng: location.lng }}
                  label={location.label}
                />
              ))}
              {locations.length === 2 && (
                <Polyline
                  path={locations.map(loc => ({ lat: loc.lat, lng: loc.lng }))}
                  options={{ geodesic: true, strokeColor: '#FF0000', strokeWeight: 4, strokeOpacity: 1 }}
                />
              )}
              {/* Render the route */}
              {directionsResponse && (
                <Polyline
                  path={directionsResponse.routes[0].overview_path.map((p: any) => ({
                    lat: p.lat(),
                    lng: p.lng()
                  }))}
                  options={{
                    geodesic: true,
                    strokeColor: "#00FF00",
                    strokeOpacity: 1,
                    strokeWeight: 5
                  }}
                />
              )}
            </Map>
          )}
        </APIProvider>
      )}
    </div>
  );
};


function setFlightRoute(routeCoordinates: { lat: number; lng: number; }[]) {
  throw new Error('Function not implemented.');
}

