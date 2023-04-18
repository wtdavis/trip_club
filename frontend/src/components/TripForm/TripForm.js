import { useState } from "react"
import { useSelector } from "react-redux"


function TripForm () {
    
    const currentUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const author = currentUser.id
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
return(
    
<form classname="tripformform" onSubmit={e => handleSubmit(e)}>
    <input type="text" className="tripforminput" value={title} onChange={e => setTitle(e.target.value)}/>
    <input type="text" className="tripforminput" value={description} onChange={e => setDescription(e.target.value)}/>
    <input type="text" className="tripforminput" value={startDate} onChange={e => setStartDate(e.target.value)}/>
    <input type="text" className="tripforminput" value={endDate} onChange={e => setEndDate(e.target.value)}/>
    <input type="submit" className="tripformsubmit" onClick={e=> handleSubmit(e)}/>
</form>
)

}

export default TripForm