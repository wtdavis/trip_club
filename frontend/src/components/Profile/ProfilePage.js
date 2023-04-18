import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserTrips, clearTripErrors } from '../../store/trips';
import * as  tripActions from '../../store/trips';
// import TweetBox from '../Tweets/TweetBox';
import TripItem from '../Trips/TripItem';
import GoogleMap from '../GoogleMap'


const ProfilePage = () => {
  const dispatch = useDispatch();
  // debugger
  const currentUser = useSelector(state => state.session.user);
  // const userTrips = useSelector(state => Object.values(state.trips))
  // const userTrips = dispatch(fetchUserTrips(currentUser._id));

  const trips = useSelector(tripActions.getTrips);
  
  useEffect(() => {
    dispatch(tripActions.fetchTrips());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(tripActions.fetchUserTrips(currentUser._id));
    return () => dispatch(tripActions.clearTripErrors());
  }, [currentUser, dispatch]);

  let lng = -73.99376925185645;
  let lat = 40.73631643149453;

  if (trips.length === 0) {
    return (
     <>     
      <div>{currentUser.username} has no Trips</div>
      <div>
        <GoogleMap lng={lng} lat={lat}/>
      </div>
  </> 

  )} else {
    return (
      <>
        <h2>All of {currentUser.username}'s Trips</h2>
        <div>
        <GoogleMap lng={lng} lat={lat}/>
      </div>
        {/* {userTrips.map(trip => (
          <TripItem
            key={trip._id}
            trip={trip}
          />
        ))} */}

      </>
    );
  }


  //  return (
  //     <>
  //       <h2>All of {currentUser.username}'s Trips</h2>
  //       {/* {userTrips.map(trip => (
  //         <TripItem
  //           key={trip._id}
  //           trip={trip}
  //         />
  //       ))} */}

  //     </>
  //   );
}

export default ProfilePage;
