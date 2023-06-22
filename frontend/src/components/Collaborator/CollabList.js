import { useState } from "react";
import Collaborator from "./Collaborator"
import './CollabList.css'


const CollabList = (props) => {
    
    // const [usersArr, setUsersArr] = useState([])
    const setCollaborators = props.setCollaborators;    
    let users = []
    let currentTrip
    if (props.currentTrip) {
        currentTrip = props.currentTrip
        users = Object.values(currentTrip.collaborators)
    } else {
        const setCollaborators = props.setCollaborators
        users = props.collaborators
    }

    // setUsersArr(users)

    const collabRemove = (user) => {
        let updatedUsers = users.filter(collab => collab.email !== user.email)
        debugger
        setCollaborators(updatedUsers)
    }
    return (
        <ul>    
            {users.map(user => {
               return (
                <div className="collaboratoritem">
                    <li 
                        className="collaboratoritem_li"
                        key={user._id}>
                        {Collaborator({user: user, currentTrip: currentTrip, collabRemove: collabRemove})}
                    </li>
                </div>
               )
           })}
        </ul>
    )
}

export default CollabList