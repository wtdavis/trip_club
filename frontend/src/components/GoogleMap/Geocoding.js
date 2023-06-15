import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import './Geocoding.css';

// const Geocoding = ({ locationUpdate }) => {
  const Geocoding = ({ currentTrip, locationUpdate }) => {
  // const currentTrip = useSelector(state => state.trips.current)

  const [geocodeData, setGeocodeData] = useState(null);
  const [address, setAddress] = useState(currentTrip ? currentTrip.address : "");
  const [updatedAddress, setUpdatedAddress] = useState(currentTrip ? currentTrip.address : "");
debugger
  const apiKey = process.env.REACT_APP_MAPS_API_KEY; 
  // let address = '22 Main st Boston MA';
  // let address = '1600 Amphitheatre Parkway, Mountain View, CA'
  // const inputRef = useRef();
  const autoCompleteRef = useRef();
  const options = {
   fields: ["address_components", "geometry", "icon", "name", "formatted_address"],
   types: ["establishment"]
  };
   
  // autoCompleteRef.current = new window.google.maps.places.Autocomplete(
  //   // autoCompleteRef.current = new google.maps.places.Autocomplete(
  //   document.getElementById('address_input'),
  //   //  inputRef.current,
  //   options
  // );
  
  useEffect(() => {
      // debugger
      const fetchData = async() => {
        try{
          let searchAddress
          address === '' ? searchAddress = '90 5th Ave, New York, NY 10011' : searchAddress = address
          let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchAddress)}&key=${apiKey}`;
          // let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
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
 
  }, [address]);

  // useEffect(() => {

  //  const loadPlacesLibrary = () => {
  //     const script = document.createElement('script');
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  //     script.async = true;
  //     script.defer = true;
  //     document.body.appendChild(script);
  //     script.onload = autoCompleteRef;
  //   };

  //   loadPlacesLibrary();

  //       autoCompleteRef.current = new window.google.maps.places.Autocomplete(
  //         // autoCompleteRef.current = new google.maps.places.Autocomplete(
  //           document.getElementById('address_input'),
  //           //  inputRef.current,
  //            options
  //           );

  //  }, []);


  const handleUpdatedAddress = async (e) => {
    e.preventDefault()
    setAddress(updatedAddress)
  }

  if (!geocodeData) {
    return <div>Loading...</div>;
  }

  // console.log(updatedAddress)
  
  const { results } = geocodeData;
  // debugger
  if (results && results.length > 0) {
    const latDB = results[0].geometry.location.lat;
    const lngDB = results[0].geometry.location.lng;
    const addressDB = results[0].formatted_address;
    locationUpdate(latDB, lngDB, addressDB);
    console.log(latDB, lngDB, addressDB);
    console.log(geocodeData)

    return (
      <div className="geocoding_container">
        <input
          id="address_input"
          className="trip_address_input"
          type='text'
          onChange={e => {setUpdatedAddress(e.target.value)}}
          placeholder={address === '' ? "Address" : null}
          // placeholder={currentTrip ? currentTrip.address : "Address"}
          // ref={inputRef}
          ref={autoCompleteRef}          
          value={updatedAddress}
        />

        <div class="addaddress_button_container">          
          <button 
            className="addaddress_button"
            onClick={handleUpdatedAddress}
          >
            Update Address
          </button>
        </div>

        <div>
          {/* <p>Latitude: {latDB}, Longitude: {lngDB}</p> */}
          {/* <p className="tripformsubheader">Address: {address === '' ? '': address}</p> */}
          {/* <p className="tripformsubheader">Latitude: {address === '' ? '': latDB.toFixed(2)} Longitude: {address === '' ? '': lngDB.toFixed(2)}</p> */}

          <p className="geolocation_info"> 
            <span className="geolocation_header">Address: </span>
              {address === '' ? '': address} 
            <span className="geolocation_header">Latitude: </span>
              {address === '' ? '': latDB.toFixed(2)} 
            <span className="geolocation_header">Longitude: </span>
              {address === '' ? '': lngDB.toFixed(2)}
          </p>
        </div>


      </div>
    )
  }
  

}

export default Geocoding;

