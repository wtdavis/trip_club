import Collaborator from "./Collaborator"

function CollabList (props) {
    const currentTrip = props.currentTrip
    // const users = props.users
    const usersArr = Object.values(currentTrip?.collaborators)
    return (
        <>
                {usersArr.map((user) => { 
                    {Collaborator({user: user, currentTrip: currentTrip})}
                    }
                )}
        </>
    )
}

export default CollabList