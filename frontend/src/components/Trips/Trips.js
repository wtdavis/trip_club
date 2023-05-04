import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTripErrors, fetchTrips } from '../../store/trips';
import TripItem from './TripItem';



const Trips = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const tripsSelected = useSelector(state => Object.values(state.trips.user));
  
  useEffect(() => {
    dispatch(fetchTrips());
    return () => dispatch(clearTripErrors());
  }, [dispatch])

  if (tripsSelected.length === 0) {
    return <div>There are no trips</div>;
  } else {
    return (
      <>
        <h2>All Trips</h2>
        {tripsSelected.map(trip => (
          // <TripItem key={trip._id} trip={trip} />
          <TripItemCarousel key={trip._id} trip={trip} />
        ))}
      </>
    );
  };
}

export default Trips;
