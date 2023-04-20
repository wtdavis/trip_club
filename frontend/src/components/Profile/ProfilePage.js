import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as  tripActions from '../../store/trips';
import TripItem from '../Trips/TripItem';
import TripTest from '../Trips/TripTest';
import './ProfilePage.css'
import { clearEvents, fetchEvents } from '../../store/events';



const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  // const trips = useSelector(tripActions.getTrips); 
  const trips = useSelector(state => Object.values(state.trips.all))
  const tripsUser = trips.filter(trip => trip.author._id == currentUser._id);
  const events = useSelector(state => state.events)
  
  useEffect(() => {
    dispatch(clearEvents())
    dispatch(tripActions.fetchTrips());
    dispatch(fetchEvents())
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(tripActions.fetchUserTrips(currentUser._id));
    return () => dispatch(tripActions.clearTripErrors());
  }, [currentUser, dispatch]);



if (trips) {
  if (trips.length == 0) {
    return (
     <div className='trips-div'>     
      <div>You have no Trips</div>
           </div> 

  )} else if (trips.length > 0){
    return (
      <div className='trips-container'>

        <div className='trips-div'>
          <div className='header_message'>
            <h1 className='header_message_h2'> Your Trips</h1>
          </div>
          
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
