import React from 'react';
import { useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as  tripActions from '../../store/trips';
import * as  sessionActions from '../../store/session';
import GoogleMap from '../GoogleMap'
import './TripShow.css';
import * as eventActions from "../../store/events"
import EventForm from '../EventForm/EventForm';
import EventItem from '../EventItem/EventItem';


const TripShow = (props) => {


  const dispatch = useDispatch()
  const currentTrip = useSelector(state => state.trips.current)
  const tripEvents = useSelector(state => state.events)
  const [trip, setTrip] = useState(false)
  const [dateList, setDateList] = useState([])
  const [eventList, setEventList] = useState([])
  // const [thing, setThing] = useState()  



  useEffect(()=>{
    if (props?.location.trip !== undefined) {
      const storageTrip = JSON.stringify(props.location.trip);
      setTrip(props.location.trip);
      dispatch(tripActions.setCurrentTrip(props.location.trip))
      localStorage.setItem("currentTrip", storageTrip);
    } else {
      const storageTrip = JSON.parse(localStorage.getItem("currentTrip"));
      dispatch(tripActions.setCurrentTrip(storageTrip))
      setTrip(storageTrip)
      dispatch(eventActions.clearEvents())
      dispatch(eventActions.fetchTripEvents(storageTrip._id))
    }; 
   
  }, [dispatch]
  )
  
// if (!tripEvents) {
//   dispatch()
// }



  const users = useSelector(state => state.users);
  const currentUser = useSelector(state => state.session.user);


  const eventseventsevents = [new Date(2023, 3, 30), {id: "50505", startTime: new Date(2023, 3, 20)}, new Date(2023, 3, 18), new Date(2023, 3, 25)]

  let lng = -73.99376925185645;
  let lat = 40.73631643149453;
  const startDate = trip.startDate;
  const endDate = trip.endDate;

  const startDateString = new Date(trip.startDate).toDateString()
  const endDateString = new Date(trip.endDate).toDateString()



  const dates = () => {
    let res =  trip.startDate;
    let list = [];
    // debugger
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

   if (dateList.length && currentTrip) {return (
      <div className='tripshowpage'>

        <div className='tripshowtrippanel'>
          <div className='tripshowinfo'>
            <p className='tripshowinfoitem' id='tripshowtriptitle'>{trip.title}</p>
            <p className='tripshowinfoitem' id='tripshowtripdescription'>{trip.description}</p>
            <ul className='tripshowinfoitem' id='tripshowtripcollaborators'>{trip.collaborators.map(e => (<li>{e.username}</li>))}</ul>
            <p className='tripshowinfoitem' id='tripshowstartdate'>Begins {startDateString}</p>
            <p className='tripshowinfoitem' id='tripshowenddate'>Ends {endDateString}</p>
            <EventForm  id="eventform" trip={trip}/>
          </div>
        </div>
          <div className='tripshoweventslist'>
            {events.map((ele) => (<EventItem event={ele}/>))}
            {/* {dateList[0].toDateString()} */}
            {/* <p> test</p> */}
          </div>
      </div>
  )}

  // return(<p > trip {title} description {description}</p>)


}
export default TripShow