import React from 'react';
import { useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as  tripActions from '../../store/trips';
import * as  sessionActions from '../../store/session';
import GoogleMap from '../GoogleMap'
import './TripShow.css';

const TripShow = () => {
  const { tripId } = useParams();
  // const dispatch = useDispatch();
  // const history = useHistory;
  const trip = useSelector(state => Object.values(state.trips.all[tripId]))

  // const userId = listing ? listing.userId : null 
  // const user = useSelector(state => state.users ? state.users[userId] : null);
  // const users = useSelector(state => state.users);
  // const reviews = useSelector(state => Object.values(state.reviews));
  // const reviewsSelected = reviews.filter(review => review.listingId == listingId);

  // const currentUser = useSelector(state => state.session.user);

  // const handleCLick = (e) => {
  //   e.preventDefault();
  //   dispatch(tripActions.fetchTrip(trip._id))
  // }

  let lng = -73.99376925185645;
  let lat = 40.73631643149453;


  if (trip) return (
    
      <>
        <p>{trip.title}</p>
        <p>{trip.descrption}</p>
        <p>{trip.collabarotors}</p>
      </>
  )
};

export default TripShow;