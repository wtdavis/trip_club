import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as  tripActions from '../../store/trips';
import GoogleMap from '../GoogleMap';
import './Trips.css';
import Carousel from '../Carousel/Carousel';


const TripItemCarousel = ({trip}) => {

  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false)

  const handleCLick = (e) => {
    e.preventDefault();
    dispatch(tripActions.fetchTrip(trip._id))
  }
  const currentTrip = trip
  const events = useSelector(state => state.trips.user[currentTrip._id].events)
  // debugger
  const tripEvents = (events ? Object.values(events).filter(e => e.trip === currentTrip._id) : [])
  // let lng = -73.99376925185645;
  // let lat = 40.73631643149453;

  const handleShow = (e) => {
    e.preventDefault();
    setIsShow(true)
  }  
  if (isShow) {
    return (
    <Redirect to={{pathname:`trips/show`, trip: trip}}/>
    )
  }
  
  if (currentTrip) return (
    <div className="trip_item_container" > 
      <h2 className='trip_title' onClick={handleShow}>{trip.title.length < 25 ? trip.title : `${trip.title.slice(0,25)}...`}</h2>

      <div className="trip_grid" >
      <div className='left_column'>
          <Carousel tripImages={trip.imageUrls}/>
        </div>

        <div className='right_column' onClick={handleCLick}>
          <div className="trip_link" onClick={handleShow} >
            <ul className='event_titles'>
              {tripEvents.map(event => (<li key={event._id}>{event.title}</li>))}
            </ul>      

          </div>

          <div className='google_map_container'>
              <GoogleMap lng={currentTrip.lng} lat={currentTrip.lat}/>
            </div>


        </div> 

      </div>

            
        
      </div>
  )
};

export default TripItemCarousel;