import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { composeTrips } from "../../store/trips";

function EventForm (trip) {




    const dispatch = useDispatch()    
    const currentUser = useSelector(state => state.session.user)
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const author = currentUser.id
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            author: currentUser._id,
            description: description,
            startDate: startDate,
            endDate: endDate,
            trip: trip._id
        }
        // dispatch(composeTrips(formData))
    }
return(
    <div className="eventformdiv">
        <h3 className="eventformheader">Create a New Event!</h3>
        <form classname="eventformform" onSubmit={e => handleSubmit(e)}>
       
            {/* <p className="eventformsubheader">Name Your New Event:</p>
            <input type="text" className="eventforminput" value={title} onChange={e => setTitle(e.target.value)}/> */}
            
            <p className="eventformsubheader">Enter a description:</p>
            <textarea className="eventforminput" value={description} onChange={e => setDescription(e.target.value)}/>
            
            <p className="eventformsubheader">Event Start Date:</p>
            <input type="date" className="eventforminput" value={startDate} onChange={e => setStartDate(e.target.value)}/>
            
            <p className="eventformsubheader">Event End Date:</p>
            <input type="date" className="eventforminput" value={endDate} onChange={e => setEndDate(e.target.value)}/>
            <br/>
            <input type="submit" className="eventformsubmit"  value="Create!" onClick={e=> handleSubmit(e)}/>
        </form>
    </div>
)

}


export default EventForm
