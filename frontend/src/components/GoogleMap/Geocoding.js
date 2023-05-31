import React, { useState, useEffect } from 'react';
import './GoogleMap.css';

const Geocoding = () => {
  const [geocodeData, setGeocodeData] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try{
        // let address = '22 Main st Boston MA';
        let address = 'Boston MA';
        // let address = '1600 Amphitheatre Parkway, Mountain View, CA'
        // debugger
        const apiKey = process.env.REACT_APP_MAPS_API_KEY; 

        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setGeocodeData(data);
        } else {
          console.error('Request failed with status code: ', response.status);
        }
      } catch (error) {
        console.error('Request failed: ', error);
      }
    };

    fetchData();
  }, []);

  if (!geocodeData) {
    return <div>Loading...</div>;
  }

  console.log(geocodeData)

  const { results } = geocodeData;
  if (results && results.length > 0) {
    const lat = results[0].geometry.location.lat;
    const lng = results[0].geometry.location.lng;

    return (
      <div>
        <p>Latitude: {lat}, Longitude: {lng}</p>
      </div>
    )}
}

export default Geocoding;

