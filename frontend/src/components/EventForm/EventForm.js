import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Calendar from "react-calendar";
import { createTripEvent, updateEvent, updateTripEvent } from "../../store/events";
import { fetchTrip, setCurrentTrip } from "../../store/trips";
import Geocoding from "../GoogleMap/Geocoding"
import "./EventForm.css"


function EventForm (props) {
    const {setShowEventEditModal, event} = props
    const currentTrip = props.currentTrip
    const dispatch = useDispatch()    
    const currentUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState(event ? event.title : "")
    const [description, setDescription] = useState(event ? event.description : "")
    const [startTime, setStartTime] = useState(event ? event.startTime : null)
    const [endTime, setEndTime] = useState(event ? event.endTime : null)
    const [eventFormTitle, setEventFormTitle] = useState(event ? "Edit Event" : "Create a New Event!")
    const [eventContinueButton, setEventContinueButton] = useState(event ? "Edit Event" : "Create Event")
    // set location to App Academy office by default
    const [lat, setLat] = useState(event ? event.lat : 40.73631643149453);
    const [lng, setLng] = useState(event ? event.lng : -73.99376925185645);
    const [address, setAddress] = useState(event ? event.address : '90 5th Ave, New York, NY 10011');

    // function handleLocation handles coordinates update when passed to Geocoding
    const handleLocation = (lat, lng, address) => {
        setLat(lat);
        setLng(lng);
        setAddress(address);
        // console.log('Message from EditForm')
        // console.log(lat);
        // console.log(lng);
        // console.log(address);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            author: currentUser._id,
            title: title,
            description: description,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            trip: currentTrip._id,
            lat: lat,
            lng: lng,
            address: address
        }

        if (event){
            let data = {...event, ...formData}
            dispatch(updateTripEvent(data))
            .then(res => dispatch(fetchTrip(currentTrip._id)))
            .then(res => dispatch(setCurrentTrip(res)))
            setShowEventEditModal(false)
        } else {
            dispatch(createTripEvent({trip: currentTrip, event: formData}))
            .then(res => {
                // debugger
            })
            // dispatch(fetchTrip(currentTrip._id))
            // .then(res => {
            //     setCurrentTrip(res)
            //     debugger
            // })
            
        }

    }

    const formattedDate = (timeVariable) => {
        const date = new Date(timeVariable)
        return(
            date.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric"
        }))
    }

    const formattedTime = (timeVariable) => {
        const date = new Date(timeVariable)
        return(
            date.toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
        }))
    }



return(
    <div className="eventformdiv">
        {props?.event &&  
        <button onClick={e=> {setShowEventEditModal(false)}}>
            <i id="eventeditclosebutton" class="fa fa-x"></i>
            </button>}
        <header className="createevent_header">
          <div className="eventformheader">{eventFormTitle}</div>
        </header> 

        <form classname="eventformform" onSubmit={e => handleSubmit(e)}>
       
            <input 
                className="createevent_input" 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                placeholder="Name Your Event"
            />
            
            <textarea 
                className="createevent_input description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter a description"
            />

            <div className="event_date_container">
                <p className="eventformsubheader">Start Date:</p>
                <input 
                    className="createevent_input" 
                    type="datetime-local" 
                    // type={startTime !== null ? 'text' : 'datetime-local'}
                    value={startTime }
                    onChange={e => setStartTime(e.target.value)}
                    // placeholder={startTime !== null ? startTime : ''}
                    // onBlur={e => {
                    //     e.target.type = 'text';
                    //     e.target.placeholder = startTime !== null ? startTime : 'time';
                    // }}
                    // onFocus={e => {
                    //     e.target.type = 'datetime-local';
                    //     e.target.placeholder = 'time';
                    // }}
                    // placeholder={startTime !== null ? `${formattedDate(startTime)} ${formattedTime(startTime)}` : "YOYOYO"}
                    />
            </div>
            
            <div className="event_date_container">
                <p className="eventformsubheader">End Date:</p>
                <input 
                    type="datetime-local" 
                    className="createevent_input" 
                    value={endTime} 
                    onChange={e => setEndTime(e.target.value)}
                />
            </div>
            
            {/* <Calendar/> */}

            <div>
              <Geocoding locationUpdate={handleLocation} event={event}/>
            </div>

            <br/>
            <button 
                className="continue_button" 
                type="submit" 
                // value={submit} 
                onClick={e=> handleSubmit(e)}
            >
                {eventContinueButton}
                {/* Create Event */}
            </button>
        </form>
    </div>
)

}


export default EventForm

