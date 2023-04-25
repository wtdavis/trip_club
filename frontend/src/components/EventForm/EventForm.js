import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Calendar from "react-calendar";
import { createTripEvent } from "../../store/events";
import "./EventForm.css"

function EventForm (props) {

    const currentTrip = props.trip
    const dispatch = useDispatch()    
    const currentUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

    // const author = currentUser.id
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
        dispatch(createTripEvent({tripId: currentTrip._id, event: formData}))
    }
return(
    <div className="eventformdiv">
        <header className="createevent_header">
          <div className="eventformheader">Create a New Event!</div>
        </header> 
        {/* <h3 className="eventformheader">Create a New Event!</h3> */}
        <form classname="eventformform" onSubmit={e => handleSubmit(e)}>
       
            {/* <p className="eventformsubheader">Name Your New Event:</p> */}
            <input 
                className="createevent_input" 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                placeholder="Name Your New Event"
            />
            
            {/* <p className="eventformsubheader">Enter a description:</p> */}
            <textarea 
                className="createevent_input description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter a description"
            />
            
            <p className="eventformsubheader">Event Start Date:</p>
            <input 
                className="createevent_input" 
                type="datetime-local" 
                value={startTime} 
                onChange={e => setStartTime(e.target.value)}
            />
            
            <p className="eventformsubheader">Event End Date:</p>
            <input 
                type="datetime-local" 
                className="createevent_input" 
                value={endTime} 
                onChange={e => setEndTime(e.target.value)}
            />
            {/* <Calendar/> */}
            <br/>
            <button 
                className="eventformsubmit" 
                type="submit" 
                // value={submit} 
                onClick={e=> handleSubmit(e)}
            >
                Continue
            </button>
            {/* <button type="submit" className="tripcreate_button" value={submit} onClick={e=> handleSubmit(e)}>Continue</button> */}


            {/* <input type="submit" className="eventformsubmit"  value="Create!" onClick={e=> handleSubmit(e)}/> */}
        </form>
    </div>
)

}


export default EventForm

