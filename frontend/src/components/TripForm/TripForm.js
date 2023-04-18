import { useState } from "react"
import { useSelector } from "react-redux"


function TripForm () {
    
    const currentUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const author = currentUser.id
    const handleSubmit = () => {

    }

    
<form classname="tripformform" onSubmit={handleSubmit}>
    <input type="text" className="tripforminput" value={title} onChange={e => setTitle(e.target.value)}/>
    <input type="text" className="tripforminput" value={description} onChange={e => setDescription(e.target.value)}/>
    <input type="text" className="tripforminput" value={startDate} onChange={e => setStartDate(e.target.value)}/>
    <input type="text" className="tripforminput" value={endDate} onChange={e => setEndDate(e.target.value)}/>
</form>
}

export default TripForm