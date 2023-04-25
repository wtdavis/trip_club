import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { composeTrips } from "../../store/trips"
import { useParams } from "react-router-dom"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import * as userActions from '../../store/users'
import * as tripActions from '../../store/trips'


function TripEditForm () {
    const dispatch = useDispatch()
    const { tripId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const currentTrip = useSelector(state => state.trips.edit)
    const [title, setTitle] = useState(currentTrip.title)
    const [description, setDescription] = useState(currentTrip.description)
    const [startDate, setStartDate] = useState(currentTrip.startDate)
    const [endDate, setEndDate] = useState(currentTrip.endDate)
    const [submit, setSubmit] = useState("Update Trip")
    const [collaborators, setCollaborators] = useState([currentTrip.collaborators])
    const allUsers = Object.values(useSelector(state => state.users))
    const [redirect, setRedirect] = useState(false)
    const [newTrip, setNewTrip] = useState(currentTrip);
    const [currCollaborator, setCurrCollaborator] = useState('')
    const [collabErrors, setCollabErrors] = useState(false)
    
    useEffect(() => {
        dispatch(userActions.fetchAllUsers())
        dispatch(tripActions.fetchTrip(tripId))
    }, [])

    let collaboratorIds = []

    if (redirect) {
        // debugger
        return <Redirect to={{pathname:`/trips/show`, trip: newTrip}}/>
    }
    
    const author = currentUser.id
    const handleSubmit = async (e) => {
        e.preventDefault();
        let collaboratorIds = []
        allUsers.forEach(user => {
            // debugger
            if (collaborators.includes(user.email)) {
                // debugger
                collaboratorIds.push(user._id)
            }
        })
        // debugger
        const formData = {
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            collaborators: collaboratorIds
        }
        // debugger
        setNewTrip(await dispatch(tripActions.updateTrip(formData)))
        // debugger
        setRedirect(true)
    }
    
    const handleRemove = (e) => {
        e.preventDefault()
        const emailToRemove = e.target.value
        allUsers.forEach((user) => {
            if (emailToRemove === user.email) {
                const emailsIdxOf = collaborators.indexOf(user.email)
                if (emailsIdxOf !== -1) {
                    const prevCollaborators = [...collaborators]
                    setCollaborators(prevCollaborators => {
                        return prevCollaborators.filter(prevCollaborator => (prevCollaborator !== emailToRemove))
                    })
                    // debugger
                }
                // debugger
            }
        })
    }

    const handleAdd = (e) => { 
        // debugger
        e.preventDefault()
        setCollabErrors(true)
        allUsers.forEach((user) => {
            // debugger
            if (currCollaborator === user.email) {
                // debugger
                collaboratorIds = (collaboratorIds.concat(user._id))
                // debugger
                const newArr = collaborators.slice()
                const anotherNewArr = newArr.concat(user.email)
                setCollaborators(anotherNewArr)
                setCollabErrors(false)
                setCurrCollaborator('')
                // debugger
            }
        })
        // debugger
    }
    
    const CollaboratorsList = () => {
        // debugger
        return (
            <ul>
                {collaborators.map(collaborator => {
                    // debugger
                    return (
                        <li><span>{collaborator}</span><button value={collaborator} onClick={e => handleRemove(e)}>Remove</button></li>
                        )
                    })}
            </ul>
        )
    }
    
    return(
        <div className="tripformdiv">
        <h3 className="tripformheader">Update Your Trip!</h3>
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

            <ul className="tripformsubheader">Add a Collaborator by Email
                <input type='text'
                        value={currCollaborator}
                        onChange={e => setCurrCollaborator(e.target.value)}
                />
                <button onClick={(e) => handleAdd(e)}>Add</button>
            </ul>     
            <span>{collabErrors ? 'No user found with that email' : null}</span>       
            <p className="tripformsubheader">Collaborators: {CollaboratorsList()}</p>
            <br/>
            <input type="submit" className="tripformsubmit"  value={submit} onClick={e=> handleSubmit(e)}/>
        </form>
    </div>
)
}

export default TripEditForm