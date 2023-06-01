import React, { useState, useEffect } from 'react';
import './Geocoding.css';

const Geocoding = () => {
  //
  const [geocodeData, setGeocodeData] = useState(null);
  const [address, setAddress] = useState('1600 Amphitheatre Parkway, Mountain View, CA');
  const apiKey = process.env.REACT_APP_MAPS_API_KEY; 
  // let address = '22 Main st Boston MA';
  // let address = '1600 Amphitheatre Parkway, Mountain View, CA'

  
  useEffect(() => {
    const fetchData = async() => {
      try{
        // debugger
        
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const response = await fetch(url);
        console.log(address)
        if (response.ok) {
          // debugger
          const data = await response.json();
          setGeocodeData(data);
        } else {
          console.error('Unsuccessful request with status code: ', response.status);
        }
      } catch (error) {
        console.error('Unsuccessful request with error: ', error);
      }
    };

    fetchData();
  }, [address]);

  if (!geocodeData) {
    return <div>Loading...</div>;
  }

  console.log(geocodeData)

  const { results } = geocodeData;
  if (results && results.length > 0) {
    const lat = results[0].geometry.location.lat;
    const lng = results[0].geometry.location.lng;

    const handleUpdateAddress = async () => {
      try {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const response = await fetch(url);

        debugger

        if (response.ok) {
          const data = await response.json();
          setGeocodeData(data);
        } else {
          console.error('Unsuccessful request with status code: ', response.status);
        }
      } catch (error) {
        console.error('Unsuccessful request with error: ', error);
      }
    };

    return (
      <div>
        <input
          className="trip_address_input"
          type='text'
          value={address}
          onChange={e => {setAddress(e.target.value)}}
          placeholder="Address"          
        />

        <button 
          className="addaddress_button"
          onClick={handleUpdateAddress}
        >
          Update Address
        </button>
        <p>Latitude: {lat}, Longitude: {lng}</p>


      </div>
    )}
}

export default Geocoding;

