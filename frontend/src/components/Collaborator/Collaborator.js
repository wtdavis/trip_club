import { useDispatch } from "react-redux"
import { fetchTrip, removeCollaborator } from "../../store/trips"

function Collaborator (props) {
const currentTrip = props.currentTrip
const currentUser = props.user
const dispatch = useDispatch()

debugger

    const handleDelete = () => {
        dispatch(removeCollaborator(currentTrip, currentUser))
    }

        <li className="collaboratoritem">
            <div>
                {currentUser.email}
            </div>
             <i class="fa-solid fa-trash-can" onClick={handleDelete}>
                </i>            
        </li>



    return (
        
    )

}

export default Collaborator