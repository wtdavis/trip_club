import { useDispatch } from "react-redux"
import { fetchTrip, removeCollaborator } from "../../store/trips"
import './Collaborator.css'

const Collaborator = (props) => {
    const collabRemove = props.collabRemove
    const currentTrip = props.currentTrip
    const currentUser = props.user
    const dispatch = useDispatch()


        const handleDelete = () => {
            if (props.currentTrip){
                dispatch(removeCollaborator(currentTrip, currentUser))
            } else { 
                collabRemove(currentUser)

        }

    }



        // <div className="collaboratoritem">
        //     </div>
        
        return (

            <>
                {/* <div className="collaboratoritem"> */}
                    <p>{currentUser.email}</p>
                    <p>{currentUser.username}</p>
                    <button onClick={handleDelete}>
                        <i data-title="Remove" className="fa-solid fa-trash-can"></i>

                        {/* <i className="fa-solid fa-trash-can"></i> */}
                    </button>
                {/* </div> */}
            </>

        )

    }

export default Collaborator