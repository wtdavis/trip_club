import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EventForm from '../EventForm/EventForm';
import GoogleMap from '../GoogleMap'
import { addEventCollaborator, deleteEvent } from '../../store/events';
import { useDispatch } from 'react-redux';
import CollabList from '../Collaborator/CollabList';

function EventItem (props)  {
  const dispatch = useDispatch()
  const event = props.event
  const currentTrip = props.currentTrip
  const collaborators = props.event.collaborators
  // debugger
  const [showEventEditModal, setShowEventEditModal] = useState(false)
  const [collab, setCollab] = useState("")


  let startTime = new Date(props.event.startTime).toDateString()
  let endTime = new Date(props.event.endTime).toDateString()

  const handleDelete = () => {
    // debugger
    dispatch(deleteEvent({trip: currentTrip, eventId: event._id}))
  }

  const handleAddCollab = () => {
    let allCollabs = Object.values(currentTrip.collaborators)
    
    for (let i=0;i<allCollabs.length;i++) {
      let temp = allCollabs[i]
       debugger
      if (temp.username === collab) {
        debugger
        dispatch(addEventCollaborator(temp, event))
        setCollab("")
      }
     }
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
            <div className="eventitemitem_container">

              <span className="eventitemitem date">{startTime}</span>
              -
              <span className="eventitemitem">{endTime}</span>
            </div>
            <CollabList type="event" collaborators={collaborators}/>
            <label for="eventitemcollabinput"> Invite A friend
              <input id="eventitemcollabinput" type="text" onChange={e => setCollab(e.target.value)} value={collab}/>
              <button onClick={e => handleAddCollab()}>Add</button>
            </label>  
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