import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as  tripActions from '../../store/trips';
import TripItem from '../Trips/TripItem';
import TripTest from '../Trips/TripTest';
import GoogleMap from '../GoogleMap'
import './ProfilePage.css'



const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  // const trips = useSelector(tripActions.getTrips); 
  const trips = useSelector(state => Object.values(state.trips.all))
  const tripsUser = trips.filter(trip => trip.author._id == currentUser._id);

  
  useEffect(() => {
    dispatch(tripActions.fetchTrips());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(tripActions.fetchUserTrips(currentUser._id));
    return () => dispatch(tripActions.clearTripErrors());
  }, [currentUser, dispatch]);


  let lng = -73.99376925185645;
  let lat = 40.73631643149453;

if (trips) {
  if (trips.length == 0) {
    return (
     <div className='trips-div'>     
      <div>{currentUser.username} has no Trips</div>
      <div>
        <GoogleMap lng={lng} lat={lat}/>
      </div>
     </div> 

  )} else if (trips.length > 0){
    return (
      <div className='trips-div'>
        <div>
          <GoogleMap lng={lng} lat={lat}/>
        </div>

        <div className='trips-div'>
          <h2>All of {currentUser.username}'s Trips</h2>
          
          {/* {tripsSelected.map(trip => (
            <TripItem
              key={trip._id}
              trip={trip}
            />
          ))} */}
          {tripsUser ? tripsUser.map(trip => (
            <TripItem 
              key={trip._id}
              trip={trip} 
            />
          )) : 
          <></>
          }

      </div>
      </div>
      
    );
  }

}


}

export default ProfilePage;
