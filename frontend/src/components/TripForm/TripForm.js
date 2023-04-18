import { useDebugValue, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { composeTrips } from "../../store/trips"


function TripForm () {
    const dispatch = useDispatch()    
    const currentUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const author = currentUser.id
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate
        }
        dispatch(composeTrips(formData))
    }
return(
    <div className="tripformdiv">
        <h3 className="tripformheader">Create a New Trip!</h3>
        <form classname="tripformform" onSubmit={e => handleSubmit(e)}>
       
            <p className="tripformsubheader">Name Your New Trip:</p>
            <input type="text" className="tripforminput" value={title} onChange={e => setTitle(e.target.value)}/>
            
            <p className="tripformsubheader">Enter a description:</p>
            <textarea className="tripforminput" value={description} onChange={e => setDescription(e.target.value)}/>
            
            <p className="tripformsubheader">Trip Start Date:</p>
            <input type="date" className="tripforminput" value={startDate} onChange={e => setStartDate(e.target.value)}/>
            
            <p className="tripformsubheader">Trip End Date:</p>
            <input type="date" className="tripforminput" value={endDate} onChange={e => setEndDate(e.target.value)}/>
            <br/>
            <input type="submit" className="tripformsubmit"  value="Create!" onClick={e=> handleSubmit(e)}/>
        </form>
    </div>
)

}

export default TripForm