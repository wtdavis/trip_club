import './GoogleMap.css';
import {useState, useRef, useEffect} from 'react';

const GoogleMap = ({lng, lat}) => {

  const [map, setMap] = useState();
  const mapRef = useRef();
  const marker = useRef({});
  // const averageLatLng = {lat:  40.75, lng:  -73.99};

  useEffect(() => {
    setMap(
      new window.google.maps.Map(
        mapRef.current, 
        {
          center: {lat:lat, lng: lng},
          zoom: 5
        }
      )
    )
  }, []);

  useEffect(() => {
    marker.current = new window.google.maps.Marker(
            {
              position: {lat: lat, lng: lng},
              map: map,
            }
          );
  })

  
  return (
    <div id="map" ref={mapRef}></div>
    );
};

export default GoogleMap;

