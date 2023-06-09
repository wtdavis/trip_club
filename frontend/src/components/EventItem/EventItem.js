import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EventForm from '../EventForm/EventForm';
import GoogleMap from '../GoogleMap'
import { deleteEvent } from '../../store/events';
import { useDispatch } from 'react-redux';

function EventItem (props)  {
  const dispatch = useDispatch()
  const event = props.event
  // debugger
  const currentTrip = props.currentTrip
  // debugger
  const [showEventEditModal, setShowEventEditModal] = useState(false)
  // let lng = -73.99376925185645;
  // let lat = 40.73631643149453;

  let startTime = new Date(props.event.startTime).toDateString()
  let endTime = new Date(props.event.endTime).toDateString()

  const handleDelete = () => {
    // debugger
    dispatch(deleteEvent({trip: currentTrip, eventId: event._id}))
  }


    if (props.event instanceof Date){
    return (
        <div className="dateseperator">
            <p className="dateseperatortext">{props.event.toDateString()}</p>
        </div>
    )} else {
      return (
        <div className="eventitembox">
          <div className='eventshow_title_container'>
            <p id="eventitemtitle" className="eventitemitem">{props.event.title}</p>
            <div className='edit_delete_buttons_event'>
              <button className='Edit_Event_Link' onClick={e => {setShowEventEditModal(true)}}>
                <i data-title="Edit Event" className="fa-solid fa-pencil fa-1x"></i>
              </button>
              <button onClick={e => handleDelete()}>
                <i data-title="Delete Event" className="fa-solid fa-trash-can fa-1x"></i>
              </button>
            </div>
          </div>

            <p className="eventitemitem description">{props.event.description}</p>
            {/* <p className="eventitemitem">{startTime}</p>
            <p className="eventitemitem">{endTime}</p> */}
            <div className="eventitemitem_container">
              <span className="eventitemitem_date"><span>Begins: </span> {startTime === 'Wed Dec 31 1969' ? null : startTime}</span>
              <span className="eventitemitem_date"><span>   Ends: </span> {endTime === 'Wed Dec 31 1969' ? null : endTime}</span>
            </div>

            <div className='google-map-container'>
              <GoogleMap lng={event.lng} lat={event.lat}/>
            </div>


            {showEventEditModal && 
            <Modal onClose={(e)=> {setShowEventEditModal(false)}}>
              <EventForm setShowEventEditModal={setShowEventEditModal} currentTrip={currentTrip} event={event}/>
              </Modal>}
        </div>
      )  
    }
}

export default EventItem