import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTrips, clearTripErrors } from '../../store/trips';
// import TweetBox from '../Tweets/TweetBox';
import Trips from '../Trips/Trips';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTrips = useSelector(state => Object.values(state.trips.user))
  
  useEffect(() => {
    dispatch(fetchUserTrips(currentUser._id));
    return () => dispatch(clearTripErrors());
  }, [currentUser, dispatch]);

  if (userTrips.length === 0) {
    return <div>{currentUser.username} has no Trips</div>;
  } else {
    return (
      <>
        <h2>All of {currentUser.username}'s Trips</h2>
        {userTrips.map(trip => (
          <TripItem
            key={trip._id}
            trip={trip}
          />
        ))}
      </>
    );
  }
}

export default ProfilePage;
