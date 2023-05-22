import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EventForm from '../EventForm/EventForm';
import GoogleMap from '../GoogleMap'

function EventItem (props)  {
  const [showEventEditModal, setShowEventEditModal] = useState(false)
  let lng = -73.99376925185645;
  let lat = 40.73631643149453;
    
  let startTime = new Date(props.event.startTime).toDateString()
  let endTime = new Date(props.event.endTime).toDateString()
    if (props.event instanceof Date){
    return (
        <div className="dateseperator">
            <p className="dateseperatortext">{props.event.toDateString()}</p>
        </div>
    )} else {
      return (
        <div className="eventitembox">
            <p id="eventitemtitle" className="eventitemitem">{props.event.title}</p>
            <p className="eventitemitem description">{props.event.description}</p>
            {/* <p className="eventitemitem">{startTime}</p>
            <p className="eventitemitem">{endTime}</p> */}
            <div className="eventitemitem_container">

              <span className="eventitemitem date">{startTime}</span>
              -
              <span className="eventitemitem">{endTime}</span>
            </div>

            <div className='google-map-container'>
              <GoogleMap lng={lng} lat={lat}/>
            </div>
            <button onClick={e => {setShowEventEditModal(true)}}>
            <i data-title="Edit Event" class="fa-solid fa-pencil fa-1x"></i>
            </button>
            <button onClick={e => {setShowEventEditModal(true)}}>
            <i data-title="Delete Event" class="fa-solid fa-trash-can fa-1x"></i>
            </button>

            {showEventEditModal && 
            <Modal onClose={(e)=> {setShowEventEditModal(false)}}>
              <EventForm setShowEventEditModal={setShowEventEditModal} event={props.event}/>
              </Modal>}
        </div>
      )  
    }
}

export default EventItem