import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Calendar from "react-calendar";
import { createTripEvent, updateEvent, updateTripEvent } from "../../store/events";
import { fetchTrip, setCurrentTrip } from "../../store/trips";
import Geocoding from "../GoogleMap/Geocoding"
import "./EventForm.css"


function EventForm (props) {
    let {setShowEventEditModal, event} = props
    const [eventAddress, setEventAddress] = useState('');
    // event === null ? setEventAddress('') : setEventAddress(event?.address);
    // debugger
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

    
    
    const handleLocation = (lat, lng, address) => {
        setLat(lat);
        setLng(lng);
        setEventAddress(address);
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
            address: ''
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
        // debugger
        setTitle('');
        setDescription('');
        setStartTime(null);
        setEndTime(null);
    }

    // Rest of the code...

    return (
        <div className="eventformdiv">
            {/* Rest of the JSX */}
        </div>
    );
}

export default EventForm;
