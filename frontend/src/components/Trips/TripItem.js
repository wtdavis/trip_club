import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Trips.css';

const TripItem = ({trip}) => {
  // const dispatch = useDispatch();
  // const history = useHistory;

  if (trip) return (
    <div>
      <Link to={`trips/show`}>
        <h2>{trip.title}</h2>
        <p>{trip.description}</p>
        <p>{trip.cost}</p>
      </Link>
    </div>
  )
};

export default TripItem;