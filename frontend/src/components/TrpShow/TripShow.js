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
    }; 
   
  }, [dispatch]
  )
  


  useEffect(()=> {
    if (trip || props?.location.trip){
    fetchEvents()}
  }, [])


const fetchEvents = () => {
  if (props?.location.trip !== undefined) {
    dispatch(eventActions.fetchTripEvents(props.location.trip._id))
  } else {
  dispatch(eventActions.fetchTripEvents(trip._id))}
}
  
  const events = useSelector(state => state.events)

  



  // const { tripId } = useParams();
  // const history = useHistory;
  // const trip = useSelector(state => Object.values(state.trips.all[tripId]))

  // const userId = listing ? listing.userId : null 
  // const user = useSelector(state => state.users ? state.users[userId] : null);
  const users = useSelector(state => state.users);
  // const reviews = useSelector(state => Object.values(state.reviews));
  // const reviewsSelected = reviews.filter(review => review.listingId == listingId);

  const currentUser = useSelector(state => state.session.user);

  // const handleCLick = (e) => {
  //   e.preventDefault();
  //   dispatch(tripActions.fetchTrip(trip._id))
  // }

  const eventseventsevents = ["bingo", "bango", "stupid", "eventnames!"]

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
      ele1 = a
    } else {
      ele1 = a.startDate
    }
    if (b instanceof Date) {
      ele2 = b
    } else {
      ele2 = b.startDate
    }
    // debugger
    return ele1 - ele2
  }

  const compareNums = (a, b) => {
    return a - b
  }

  let arr = [new Date(2023, 12, 12), new Date(2023, 5, 1 ), new Date(2023, 1, 1)]
  console.log(arr.sort(compareDates))
  // debugger
  useEffect( () => {
    dates(startDate, endDate)

}, [dispatch])
  // let datess = dateList.map(date => new Date(date).toDateString())

  // const eventsList = () => {
  //   let list = dateList.map(date =>  {date})
  //   return list
  // }

   if (dateList.length) return (
      <div className='tripshowpage'>

        <div className='tripshowtrippanel'>
          <div className='tripshowinfo'>
            <p className='tripshowinfoitem' id='tripshowtriptitle'>{trip.title}</p>
            <p className='tripshowinfoitem' id='tripshowtripdescription'>{trip.description}</p>
            <p className='tripshowinfoitem' id='tripshowtripcollaborators'>{trip.collaborators}</p>
            <p className='tripshowinfoitem' id='tripshowstartdate'>Begins {startDateString}</p>
            <p className='tripshowinfoitem' id='tripshowenddate'>Ends {endDateString}</p>
            <EventForm trip={trip}/>
          </div>
        </div>
          <div className='tripshoweventslist'>
            {dateList.map((ele) => (<EventItem event={ele}/>))}
            {/* {dateList[0].toDateString()} */}
            {/* <p> test</p> */}
          </div>
      </div>
  )

  // return(<p > trip {title} description {description}</p>)


}
export default TripShow