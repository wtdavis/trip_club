import React, { useState, useEffect } from 'react';
import './Geocoding.css';

const Geocoding = ({ coordinatesUpdate }) => {
  //
  const [geocodeData, setGeocodeData] = useState(null);
  const [address, setAddress] = useState('1600 Amphitheatre Parkway, Mountain View, CA');
  const [updatedAddress, setUpdatedAddress] = useState('');

  const apiKey = process.env.REACT_APP_MAPS_API_KEY; 
  // let address = '22 Main st Boston MA';
  // let address = '1600 Amphitheatre Parkway, Mountain View, CA'

   
    useEffect(() => {
      // debugger
      const fetchData = async() => {
        try{
          
          let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
          const response = await fetch(url);
          // console.log(address)
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
      // console.log(geocodeData)
    // if (updatedAddress !== '') {
    // }
  }, [address]);

  const handleUpdatedAddress = () => {
    setAddress(updatedAddress)
  }

  if (!geocodeData) {
    return <div>Loading...</div>;
  }

  // console.log(updatedAddress)
  
  const { results } = geocodeData;
  if (results && results.length > 0) {
    const lat = results[0].geometry.location.lat;
    const lng = results[0].geometry.location.lng;
    coordinatesUpdate(lat, lng);
    console.log(geocodeData)

    return (
      <div>
        <input
          className="trip_address_input"
          type='text'
          value={updatedAddress}
          onChange={e => {setUpdatedAddress(e.target.value)}}
          placeholder="Address"          
        />

        <button 
          className="addaddress_button"
          onClick={handleUpdatedAddress}
        >
          Update Address
        </button>
        <p>Latitude: {lat}, Longitude: {lng}</p>


      </div>
    )}
}

export default Geocoding;

