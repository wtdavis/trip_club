import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as  tripActions from '../../store/trips';
import TripItemCarousel from '../Trips/TripItemCarousel';
import './ProfilePage.css'
import { clearEvents, fetchEvents } from '../../store/events';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';



const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  // const trips = useSelector(tripActions.getTrips); 
  const trips = useSelector(state => Object.values(state.trips.all))
  const tripsUser = trips.filter(trip => trip.author?._id == currentUser?._id);
  const events = useSelector(state => state.events)
  
  
  
  useEffect(() => {
    dispatch(clearEvents())
    dispatch(tripActions.clearCurrentTrip())
    // dispatch(tripActions.clearTrips)
    dispatch(tripActions.fetchTrips());
    dispatch(fetchEvents())
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(tripActions.fetchUserTrips(currentUser?._id));
    return () => dispatch(tripActions.clearTripErrors());
  }, [currentUser, dispatch]);
  



if (trips && currentUser) {
  if (trips.length == 0) {
    return (
      <div className='trips_div'>     
        <div>You have no Trips</div>
      </div> 

  )} else if (trips.length > 0){
    return (
      <div className='trips_container'>

        <div className='trips_div'>
          <div className='header_message'>
            <h1 className='header_message_h2'> Your Trips</h1>
          </div>
          
          {tripsUser ? tripsUser.map(trip => (
            <>
              <TripItemCarousel 
              key={trip?._id}
              trip={trip} 
              />
              <hr className="horizontal_line"></hr>
            </>
          )) : 
            <></>
          }

        </div>
      </div>
      
    );
  }

} else {
  return <Redirect to="/"/>
}


}

export default ProfilePage;
