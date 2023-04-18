import React from 'react';
import './Trips.css';

const TripTest = ({trip}) => {
  if (trip) return (
      <li>
        <h2>{trip.title}</h2>
        <p>{trip.description}</p>
        <p>{trip.cost}</p>
      </li>
  )
};

export default TripTest;