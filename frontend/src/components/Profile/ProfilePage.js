import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as  tripActions from '../../store/trips';
import TripItemCarousel from '../Trips/TripItemCarousel';
import './ProfilePage.css'
import { clearEvents, fetchEvents } from '../../store/events';
import { fetchAllUsers } from '../../store/users';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Modal } from '../../context/Modal';
import TripFormModal from '../TripForm/TripFormModal';


const ProfilePage = () => {
  const [showCreateTripModal, setShowCreateTripModal] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  // const trips = useSelector(tripActions.getTrips); 
  const trips = useSelector(state => Object.values(state.trips.user))
  // const tripsUser = trips.filter(trip => trip.author?._id == currentUser?._id);
  const tripsUser = useSelector(state => state.trips.user)
  const events = useSelector(state => state.events)
  
  
  
  useEffect(() => {
    dispatch(clearEvents())
    dispatch(tripActions.clearCurrentTrip())
    // dispatch(tripActions.clearTrips)
    // dispatch(tripActions.fetchTrips());
    dispatch(fetchEvents())
    dispatch(fetchAllUsers())

  }, [dispatch]);
  
  useEffect(() => {
    dispatch(tripActions.fetchUserTrips(currentUser?._id));
    // debugger
    return () => dispatch(tripActions.clearTripErrors());
  }, [currentUser, dispatch]);
  



if (trips && currentUser) {
  if (trips.length == 0) {
    return (
      <div className='new_user_container'>     
        <div className='new_user_message_container'>
          <p>Welcome to the <span>TRIP CLUB!</span></p>
          <p>Let's create your first trip</p>
        </div>
        <button className="create_button" onClick={()=> setShowCreateTripModal(true)}>Create My First Trip!</button>

        {showCreateTripModal && (
        <Modal onClose={() => setShowCreateTripModal(false)}>
          <TripFormModal showCreateTripModal={showCreateTripModal} setShowCreateTripModal={setShowCreateTripModal} />
        </Modal>
      )}
      </div> 

  )} else if (trips.length > 0){
    return (
      <div className='trips_container'>

        <div className='trips_div'>
          <div className='header_message'>
            <h1 className='header_message_h2'>Your Trips</h1>
          </div>
          
          {tripsUser ? Object.values(tripsUser).map(trip => (
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
