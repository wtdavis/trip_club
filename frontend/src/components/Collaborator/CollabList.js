import { useState } from "react";
import Collaborator from "./Collaborator"

const CollabList = (props) => {
    const listType = props.type
    // const [usersArr, setUsersArr] = useState([])
    const setCollaborators = props.setCollaborators;    
    let collaborators = []
    let currentTrip
    if (props.currentTrip) {
        currentTrip = props.currentTrip
        collaborators = Object.values(currentTrip.collaborators)
    } else if (props.type === "event") {
        // const setCollaborators = props.setCollaborators
        collaborators = props.collaborators
    }
  

    const collabRemove = (user) => {
        let updatedUsers = collaborators.filter(collab => collab.email !== user.email)
        setCollaborators(updatedUsers)
    }
    // debugger

    return (
        <ul>    
            {collaborators.map(user => {
               return <li key={user?._id}>{Collaborator({user: user, currentTrip: currentTrip, collabRemove: collabRemove})}</li>
           })}
        </ul>
    )
}

export default CollabList