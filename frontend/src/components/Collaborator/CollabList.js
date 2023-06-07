import Collaborator from "./Collaborator"

const CollabList = (props) => {
    if (props.currentTrip ) {
        const currentTrip = props.currentTrip
        const usersArr = Object.values(currentTrip.collaborators)
    } else {
        const [usersArr, setUsersArr] = useState([])
    }
    return (
        <ul>    
            {usersArr.map(user => {
               return <li key={user._id}>{Collaborator({user: user, currentTrip: currentTrip})}</li>
           })}
        </ul>
    )
}

export default CollabList