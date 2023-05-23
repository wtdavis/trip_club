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

const TripShow = (props) => {
  const history = useHistory();
  const dispatch = useDispatch()
  const currentTrip = useSelector(state => state.trips.current)
  const tripEvents = useSelector(state => state.events)
  const [trip, setTrip] = useState(false)
  const [dateList, setDateList] = useState([])
  const [eventList, setEventList] = useState([])
  const [showEditTripModal, setShowEditTripModal] = useState(false)
  
  // debugger

const setStorageTrip = (trip) => {
  localStorage.setItem("currentTrip", trip)
}

const getStorageTrip = () => {
 return ( localStorage.getItem("currentTrip"))
}

  useEffect(()=>{
    let storageTrip
    if (props?.location.trip === undefined && !currentTrip) {
      storageTrip = JSON.parse(getStorageTrip())
      setTrip(storageTrip)
      dispatch(tripActions.setCurrentTrip(storageTrip))
    } else if (props?.location.trip !== undefined && !currentTrip) {
      storageTrip = props.location.trip
      setTrip(storageTrip)
      setStorageTrip(JSON.stringify(storageTrip))
      dispatch(tripActions.setCurrentTrip(storageTrip))
    } else {
     storageTrip = currentTrip
      setTrip(storageTrip);
      setStorageTrip(JSON.stringify(storageTrip))
      dispatch(tripActions.setCurrentTrip(storageTrip))
    };
   dispatch(eventActions.fetchTripEvents(trip._id))
  }, [dispatch, currentTrip]
  )
  

  const users = useSelector(state => state.users);
  const currentUser = useSelector(state => state.session.user);


  const eventseventsevents = [new Date(2023, 3, 30), {id: "50505", startTime: new Date(2023, 3, 20)}, new Date(2023, 3, 18), new Date(2023, 3, 25)]

  let lng = -73.99376925185645;
  let lat = 40.73631643149453;

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

  

    let events;
    let allEvents;
    if (currentTrip && dateList.length){
    allEvents = Object.values(tripEvents).filter(ele => ele.trip === currentTrip._id)
    allEvents = [...allEvents, ...dateList]
    events = allEvents.sort(compareDates)}
    const handleDeleteTrip = (e) => {
      e.preventDefault();
      dispatch(tripActions.deleteTrip(currentTrip))
      history.push("/profile")
    }


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

            <p className='tripshowinfoitem' id='tripshowtripdescription'>{trip.description}</p>
            <ul className='tripshowinfoitem' id='tripshowtripcollaborators'>{trip.collaborators.map(e => (<li>{e.username}</li>))}</ul>
            <p className='tripshowinfoitem' id='tripshowstartdate'>Begins {startDateString}</p>
            <p className='tripshowinfoitem' id='tripshowenddate'>Ends {endDateString}</p>

            <ul className="trip_show_images_ul">
              {currentTrip.imageUrls.map(photo => {
                return (              
                  <li className="trip_show_images_li"><img className="trip_show_images" src={photo} alt=""/></li>
                )
              })}
            </ul>
          
            <div className="tripshowpanelbuttons">
          {/* <button className='tripshowpanelbutton' onClick={() => {setShowEditTripModal(true)}}>Edit Trip</button> */}
          {/* <button className='tripshowpanelbutton' id="tripshowpaneldeletebutton" onClick={(e) => handleDeleteTrip(e)}>Delete Trip</button> */}
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
          <Modal onClose={(e) => {setShowEditTripModal(false); console.log(e)}}>
            <TripFormModal currentTrip={currentTrip} setShowCreateTripModal={setShowEditTripModal}/>
          </Modal>
        )}

        

      </div>
  )}

}
export default TripShow