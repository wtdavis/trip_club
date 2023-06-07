import { useDispatch } from "react-redux"
import { fetchTrip, removeCollaborator } from "../../store/trips"

const Collaborator = (props) => {
const currentTrip = props.currentTrip
const currentUser = props.user
const dispatch = useDispatch()


    const handleDelete = () => {
        
        dispatch(removeCollaborator(currentTrip, currentUser))
    }



    // <div className="collaboratoritem">
    //     </div>
    
    return (
        <div className="collaboratoritem">
            <p>{currentUser.email}</p>
            <p>{currentUser.username}</p>
            <button onClick={handleDelete}>
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    )

}

export default Collaborator