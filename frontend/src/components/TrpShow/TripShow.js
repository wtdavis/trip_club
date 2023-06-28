import React from 'react';
import { useEffect, useState } from "react"
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as  tripActions from '../../store/trips';
import * as  sessionActions from '../../store/session';
import GoogleMap from '../GoogleMap'
import './TripShow.css';
import * as eventActions from "../../store/events"
import EventForm from '../EventForm/EventForm';
import EventItem from '../EventItem/EventItem';
import { Modal } from '../../context/Modal';
import TripFormModal from '../TripForm/TripFormModal';
import { fetchAllUsers } from '../../store/users';
import CollabList from '../Collaborator/CollabList';

const TripShow = (props) => {
  const history = useHistory();
  const allUsers = useSelector(state => state.users)
  const dispatch = useDispatch()
  const currentTrip = useSelector(state => state.trips.current)
  const tripEvents = useSelector(state => state.trips.current?.events)
  const [trip, setTrip] = useState(false)
  const [dateList, setDateList] = useState([])
  const [eventList, setEventList] = useState([])
  const [showEditTripModal, setShowEditTripModal] = useState(false)
  const [collab, setCollab] = useState("")
  const [collabError, setCollabError] = useState(false)
  const [showCollab, setShowCollab] = useState(false)
  const collaborators = useSelector(state => state.trips.current?.collaborators)
  const tripErrors = useSelector(state => state.errors.trips)

  const [mapKey, setMapKey] = useState(0);

// debugger

const setStorageTrip = (trip) => {
  localStorage.setItem("currentTrip", trip)
}

const getStorageTrip = () => {
 return ( localStorage.getItem("currentTrip"))
}

const manageCurrentTrip = (props) => {
  let storageTrip = props || JSON.parse(getStorageTrip())

  setStorageTrip(JSON.stringify(storageTrip))
  setTrip(storageTrip)
  dispatch(tripActions.setCurrentTrip(storageTrip))
}

  useEffect(()=>{
    let storageTrip
    if (props?.location.trip === undefined && !currentTrip) {
      manageCurrentTrip()
      // storageTrip = JSON.parse(getStorageTrip())
      // setTrip(storageTrip)
      // dispatch(tripActions.setCurrentTrip(storageTrip))
    } else if (props?.location.trip !== undefined && !currentTrip) {
      storageTrip = props.location.trip
      manageCurrentTrip(storageTrip)
      // setTrip(storageTrip)
      // setStorageTrip(JSON.stringify(storageTrip))
      // dispatch(tripActions.setCurrentTrip(storageTrip))
    } else {
     storageTrip = currentTrip
     manageCurrentTrip(storageTrip)

      // setTrip(storageTrip);
      // setStorageTrip(JSON.stringify(storageTrip))
      // dispatch(tripActions.setCurrentTrip(storageTrip))
    };
    dispatch(eventActions.clearEvents())
    dispatch(eventActions.fetchTripEvents(trip._id))
    dispatch(fetchAllUsers())

    setMapKey(mapKey + 1);
  }, [dispatch, currentTrip]
  )

  // useEffect(() => {
  // }, [currentTrip.lat, currentTrip.lng]);

  const users = useSelector(state => state.users);
  const currentUser = useSelector(state => state.session.user);


  const eventseventsevents = [new Date(2023, 3, 30), {id: "50505", startTime: new Date(2023, 3, 20)}, new Date(2023, 3, 18), new Date(2023, 3, 25)]

  const startDateString = new Date(trip.startDate).toDateString()
  const endDateString = new Date(trip.endDate).toDateString()

  const dates = () => {
    let res =  trip.startDate;
    let list = [];
    while (res <= trip.endDate) {
      res = new Date(res);
      list.push(res)
      res = new Date(res.getFullYear(), res.getMonth(), res.getDate() + 1).toISOString();
  }
  return list
}

    let list = dates()
    if (dateList.length < list.length) {setDateList(oldlist => [...oldlist, ...list])}


  const compareDates = (a, b) => {
    let ele1;
    let ele2;
    if (a instanceof Date) {
      ele1 = a.getTime()
    } else {
      ele1 = new Date(a.startTime).getTime()
    }
    if (b instanceof Date) {
      ele2 = b.getTime()
    } else {
      ele2 = new Date( b.startTime).getTime()
    }
    return ele1 - ele2
  }

  const handleCollabSubmit = (e) => {

    let users = Object.values(allUsers)
    for (let i=0; i<users.length;i++) {
      // check if the currentTrip already has this email
      if (currentTrip?.collaborators.some(collaborator => collaborator.email === collab)) {
        setCollabError(true)
      }
      else if (
        // check if email exists in database 
        allUsers[users[i]._id].email === collab){
          dispatch(tripActions.addCollaborator(currentTrip, users[i]._id))
          .then(res => {
            dispatch(tripActions.setCurrentTrip(res))
          }) 
          setCollabError(false)       
      }
    }
  }

  const collaboratorAdd = () => {
    return (
      <form 
        className='addfreinds_form'
        onSubmit={e => e.preventDefault()}
        >

        <input 
          className="createtrip_input"
          type="text" 
          // onChange={e => setCollab(e.target.value) && setCollabError(false)}
          onChange={e => setCollab(e.target.value)}
          placeholder="Friend's Email"
        />

        <div className="addfriends_container">
          <button 
            className='addfriends_button'
            onClick={e => {e.preventDefault(); handleCollabSubmit(e)}}
          >
            Add Friend to Trip
          </button>
        </div>
      </form>
  
    )
}

const collaboratorsList = () => {
  
  return (
      <ul>
        {collaborators?.map(collaborator => <li key={collaborator._id}>{collaborator._id}</li>)}
      </ul>
    )
  }
  
  let events;
  let allEvents;
  if (currentTrip && dateList.length){
    allEvents = Object.values(tripEvents).filter(ele => ele.trip === currentTrip._id)
    allEvents = [...allEvents, ...dateList]
    // debugger
    events = allEvents.sort(compareDates)}
    
    const handleDeleteTrip = (e) => {
      e.preventDefault();
      dispatch(tripActions.deleteTrip(currentTrip))
      history.push("/profile")
    }
    
    // {collaborators?.length && 
    // collaboratorsList()}

    // debugger
    if (dateList.length && currentTrip) {return (
      <div className='tripshowpage'>

        <div className='tripshowtrippanel'>
          
          <div className='tripshowinfo'>

          <div className='tripshow_title_container'>
            <p id='tripshowtriptitle'>{trip.title}</p>

            <div className='edit_delete_buttons'>
              <button className='Edit_Trip_Link' onClick={() => {setShowEditTripModal(true)}}>
                <i data-title="Edit Trip" className="fa-solid fa-pencil fa-1x"></i>
              </button>
              <button className='Delete_Trip_Link' onClick={(e) => handleDeleteTrip(e)}>
                <i data-title="Delete Trip" className="fa-solid fa-trash-can fa-1x"></i>
              </button>
            </div>
          </div>

          <div className='tripshow_description_container'><p className='tripshowinfoitem' id='tripshowtripdescription'>{currentTrip.description}</p></div>
          {/* <ul className='tripshowinfoitem' id='tripshowtripcollaborators'>{currentTrip.collaborators?.map(e => (<li>{e.username}</li>))}</ul> */}
          
          <p className='tripshowinfoitem' id='tripshowstartdate'> <span>Begins:</span> {startDateString}</p>
          <p className='tripshowinfoitem' id='tripshowstartdate'><span>Ends:</span> {endDateString}</p>
            
            <div 
              className='addfriend_container'
              onClick={e => setShowCollab(true)}>
              <span className='addfriend_span'>Add A Friend</span>
            </div>
            {collabError ? <p className="submiterror">This friend is already going to the trip</p> : null}

            {showCollab && collaboratorAdd()}
              
            <div 
              className='tripshowinfoitem' 
              id='tripshowtripcollaborators'>
              {CollabList({currentTrip: currentTrip, users: allUsers})}
            </div>
            
            
            <ul className="trip_show_images_ul">
              {currentTrip.imageUrls?.map(photo => {
                return (              
                  <li className="trip_show_images_li"><img className="trip_show_images" src={photo} alt=""/></li>
                )
              })}              
            </ul>

            <div className='google_map_container'>
              <GoogleMap key={mapKey} lat={currentTrip.lat} lng={currentTrip.lng}/>
            </div>
          
            <EventForm  id="eventform" currentTrip={currentTrip} trip={trip}/>
          </div>
        </div>

        <div className='tripshoweventslist'>         
          {events.map((ele) => (<EventItem currentTrip={currentTrip} event={ele}/>))}
          {/* {dateList[0].toDateString()} */}
          {/* <p> test</p> */}
        </div>

        {showEditTripModal && (
          <Modal onClose={(e) => {setShowEditTripModal(false)}}>
            <TripFormModal currentTrip={currentTrip} setShowCreateTripModal={setShowEditTripModal}/>
          </Modal>
        )}

        

      </div>
  )}

}
export default TripShow