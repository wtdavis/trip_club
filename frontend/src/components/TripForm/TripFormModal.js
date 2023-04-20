import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { composeTrips } from "../../store/trips"
import { useParams } from "react-router-dom"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import * as userActions from '../../store/users'
import './TripForm.css'


const TripFormModal = (props) => {
  const {setShowCreateTripModal} = props;

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
    
    useEffect(() => {
        dispatch(userActions.fetchAllUsers())
        // setCollaborators([])
    }, [])
    useEffect(() => {

    }, [])

    let collaboratorIds = []

    if (redirect) {
        return <Redirect to={{pathname:`/trips/show`, trip: newTrip}}/>
    }
    
    const author = currentUser.id
    const handleSubmit = async (e) => {
        e.preventDefault();
        let collaboratorIds = []
        allUsers.forEach(user => {
            if (collaborators.includes(user.email)) {
                collaboratorIds.push(user._id)
            }
        })
        const formData = {
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            collaborators: collaboratorIds
        }
        setNewTrip(await dispatch(composeTrips(formData)))
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
        e.preventDefault()
        setCollabErrors(true)
        allUsers.forEach((user) => {
            if (currCollaborator === user.email) {
                collaboratorIds = (collaboratorIds.concat(user._id))
                const newArr = collaborators.slice()
                const anotherNewArr = newArr.concat(user.email)
                setCollaborators(anotherNewArr)
                setCollabErrors(false)
                setCurrCollaborator('')
            }
        })
    }
    
    const CollaboratorsList = () => {
        return (
          // <div className="friends_ul_container">
            <ul>
                {collaborators.map(collaborator => {
                    // debugger
                    return (
                        <div className="friendsemail_container">
                          <span>{collaborator}</span>
                          <button className="removefriend_button" value={collaborator} onClick={e => handleRemove(e)}>Remove</button>
                        </div>
                        )
                    })}
            </ul>
          // </div>
        )
    }
    
    return(
      <div className="createtrip_modal">
        <div onClick={() => setShowCreateTripModal(false)} className="close-button">
          <i className="fa-solid fa-x"></i>
        </div>

        <header className="createtrip_header">
          <div className="login-header-text">Create a New Trip!</div>
        </header> 

        <form classname="createtrip_form" onSubmit={e => handleSubmit(e)}>
       
            {/* <p className="tripformsubheader">Name Your New Trip:</p> */}
            <input 
              className="createtrip_input" 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              placeholder="Name Your New Trip"
            />
            
            {/* <p className="tripformsubheader">Enter a description:</p> */}
            <textarea 
              className="createtrip_input description" 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter a description"
            />
            
            <div className="createtrip_date">
              <p className="tripformsubheader">trip start date:</p>
              <input 
                type="date" 
                className="createtrip_input" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)}
              />
            </div>

            <div className="createtrip date">
              <p className="tripformsubheader">trip end date:</p>
              <input 
                className="createtrip_input" 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
            
            {/* <br/> */}

            <div className="createtrip friends_container">
              <p className="tripformsubheader">add friends:</p>
              
              <input 
                className="createtrip_input"
                type='text'
                value={currCollaborator}
                onChange={e => setCurrCollaborator(e.target.value)}
                placeholder="friend's email"
              />

              <div className="addfriends_container">
                <button 
                  className="addfriends_button"
                  onClick={(e) => handleAdd(e)}
                >
                  Add
                </button>
              </div>

            </div>     
            <span className="errors">{collabErrors ? 'No user found with that email' : null}</span>       
              <div className="friends_list_container">
                <div className="createtrip_header">Who goes on a trip:</div> 
                
                <div>{CollaboratorsList()}</div>

              </div>
              <button type="submit" className="tripcreate_button" value={submit} onClick={e=> handleSubmit(e)}>Continue</button>

            {/* <input type="submit" className="tripformsubmit"  value={submit} onClick={e=> handleSubmit(e)}/> */}
        </form>
    </div>
)
}

export default TripFormModal;