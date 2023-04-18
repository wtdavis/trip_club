import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTrips, clearTripErrors } from '../../store/trips';
// import TweetBox from '../Tweets/TweetBox';
import TripItem from '../Trips/TripItem';
import GoogleMap from '../GoogleMap'


const ProfilePage = () => {
  const dispatch = useDispatch();
  // debugger
  const currentUser = useSelector(state => state.session.user);
  const userTrips = useSelector(state => Object.values(state.trips.user))
  // const userTrips = dispatch(fetchUserTrips(currentUser._id));
  
  useEffect(() => {
    dispatch(fetchUserTrips(currentUser._id));
    return () => dispatch(clearTripErrors());
  }, [currentUser, dispatch]);

  let lng = 70;
  let lat = 70;

  if (userTrips.length === 0) {
    return <div>{currentUser.username} has no Trips</div>;
  } else {
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
