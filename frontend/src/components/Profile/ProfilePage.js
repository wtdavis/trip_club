import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserTrips, clearTripErrors } from '../../store/trips';
import * as  tripActions from '../../store/trips';
// import TweetBox from '../Tweets/TweetBox';
import TripItem from '../Trips/TripItem';
import TripTest from '../Trips/TripTest';
import GoogleMap from '../GoogleMap'


const ProfilePage = () => {
  const dispatch = useDispatch();
  // debugger;
  const currentUser = useSelector(state => state.session.user);
  // debugger
  const trips = useSelector(tripActions.getTrips); 
  console.log(trips);
  // const tripsSelected = state => Object.values(state.trips))

  
  useEffect(() => {
    dispatch(tripActions.fetchTrips());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(tripActions.fetchUserTrips(currentUser._id));
    return () => dispatch(tripActions.clearTripErrors());
  }, [currentUser, dispatch]);


  let lng = -73.99376925185645;
  let lat = 40.73631643149453;

  // if (trips){
  //   const tripsSelected = trips[0].filter(trip => trip.author._id == currentUser._id);
  // }
if (trips) {
  if (!trips) {
    return (
     <>     
      <div>{currentUser.username} has no Trips</div>
      <div>
        <GoogleMap lng={lng} lat={lat}/>
      </div>
     </> 

  )} else if (trips.length > 0){
    return (
      <>
        <h2>All of {currentUser.username}'s Trips</h2>
        <div>
        <GoogleMap lng={lng} lat={lat}/>
      </div>
        {/* {tripsSelected.map(trip => (
          <TripItem
            key={trip._id}
            trip={trip}
          />
        ))} */}
        {/* {trips[0].map(trip => (
          <TripTest 
            key={trip._id}
            trip={trip} 
          />
        ))} */}

      </>
    );
  }

}


}

export default ProfilePage;
