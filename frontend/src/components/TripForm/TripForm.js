import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { composeTrips } from "../../store/trips"
import { useParams } from "react-router-dom"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import * as userActions from '../../store/users'


function TripForm () {
    const dispatch = useDispatch()
    const { tripId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [submit, setSubmit] = useState("Create Trip")
    const [collaborators, setCollaborators] = useState([])
    const allUsers = Object.values(useSelector(state => state.users))
    const [redirect, setRedirect] = useState(false)
    const [newTrip, setNewTrip] = useState();
    const [currCollaborator, setCurrCollaborator] = useState('')
    const [collabErrors, setCollabErrors] = useState(false)
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    
    useEffect(() => {
        dispatch(userActions.fetchAllUsers())
        // setCollaborators([])
        // debugger
    }, [])
    useEffect(() => {

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
            collaborators: collaboratorIds,
            lat: lat,
            lng: lng
        }
        // debugger
        setNewTrip(await dispatch(composeTrips(formData)))
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
        <h3 className="tripformheader">Create a New Trip!</h3>
        <form className="tripformform" onSubmit={e => handleSubmit(e)}>
       
            <p className="tripformsubheader">Name Your Trip:</p>
            <input type="text" className="tripforminput" value={title} onChange={e => setTitle(e.target.value)}/>
            
            <p className="tripformsubheader">Enter a description:</p>
            <textarea className="tripforminput" value={description} onChange={e => setDescription(e.target.value)}/>
            
            <p className="tripformsubheader">Trip Start Date:</p>
            <input type="date" className="tripforminput" value={startDate} onChange={e => setStartDate(e.target.value)}/>
            
            <p className="tripformsubheader">Trip End Date:</p>
            <input type="date" className="tripforminput" value={endDate} onChange={e => setEndDate(e.target.value)}/>
            <br/>

            <p className="tripformsubheader">Latitude:</p>
            <input type="number" className="tripforminput" value={lat} onChange={e => setLat(e.target.value)}/>
            <br/>

            <p className="tripformsubheader">Longitude:</p>
            <input type="number" className="tripforminput" value={lng} onChange={e => setLng(e.target.value)}/>
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

export default TripForm