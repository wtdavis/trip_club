import React from 'react';
import { useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as  tripActions from '../../store/trips';
import * as  sessionActions from '../../store/session';
import GoogleMap from '../GoogleMap'
import './TripShow.css';
import * as eventActions from "../../store/events"

const TripShow = (props) => {
  const dispatch = useDispatch()
  const [trip, setTrip] = useState(false)

  useEffect(()=>{
    if (props?.location.trip !== undefined)
    {
      const storageTrip = JSON.stringify(props.location.trip);
      setTrip(props.location.trip);
    localStorage.setItem("currentTrip", storageTrip);
  } else {
    const storageTrip = localStorage.getItem("currentTrip");
    setTrip(JSON.parse(storageTrip))
  };
  // fetchEvents()
}, [dispatch, trip])

// const fetchEvents = () => {
//   // debugger
// dispatch(eventActions.fetchTripEvents(trip._id))
// }

const events = useSelector(state => state.events)

  const { tripId } = useParams();
  const history = useHistory;
  // const trip = useSelector(state => Object.values(state.trips.all[tripId]))

  // const userId = listing ? listing.userId : null 
  // const user = useSelector(state => state.users ? state.users[userId] : null);
  const users = useSelector(state => state.users);
  // const reviews = useSelector(state => Object.values(state.reviews));
  // const reviewsSelected = reviews.filter(review => review.listingId == listingId);

  const currentUser = useSelector(state => state.session.user);

  // const handleCLick = (e) => {
  //   e.preventDefault();
  //   dispatch(tripActions.fetchTrip(trip._id))
  // }

  let lng = -73.99376925185645;
  let lat = 40.73631643149453;


  if (trip) return (
    
      <div className='tripshowtrippanel'>
        <div className='tripshowinfo'>
        <p>{trip.title}</p>
        <p>{trip.description}</p>
        <p>{trip.collabarotors}</p>
        </div>
      </div>
  )

  // return(<p > trip {title} description {description}</p>)
};

export default TripShow;