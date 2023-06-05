import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Calendar from "react-calendar";
import { createTripEvent, updateEvent, updateTripEvent } from "../../store/events";
import "./EventForm.css"
import { fetchTrip, setCurrentTrip } from "../../store/trips";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            author: currentUser._id,
            title: title,
            description: description,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            trip: currentTrip._id
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
                    value={startTime }
                    onChange={e => setStartTime(e.target.value)}
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
            <br/>
            <button 
                className="continue_button" 
                type="submit" 
                // value={submit} 
                onClick={e=> handleSubmit(e)}
            >
                Create Event
            </button>
        </form>
    </div>
)

}


export default EventForm

