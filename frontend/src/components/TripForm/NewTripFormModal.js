import {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { composeTrips, setCurrentTrip } from "../../store/trips"
import { useParams } from "react-router-dom"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import * as userActions from '../../store/users'
import './TripForm.css'
import { updateTrip } from "../../store/trips"


const NewTripFormModal = (props) => {
  const {setShowCreateTripModal} = props;
  const currentTrip = (props.currentTrip ? props.currentTrip : null)
      
  const dispatch = useDispatch()
  const { tripId } = useParams()
  const currentUser = useSelector(state => state.session.user)
  const [title, setTitle] = useState(currentTrip ? currentTrip.title : "")
  const [description, setDescription] = useState(currentTrip ? currentTrip.description : "")
  const [startDate, setStartDate] = useState(currentTrip ? currentTrip.startDate.split("T")[0] : new Date().toISOString().split("T")[0])
  const [endDate, setEndDate] = useState(currentTrip ? currentTrip.endDate.split("T")[0] : new Date().toISOString().split("T")[0])
  const [submit, setSubmit] = useState("Create Trip")
  const [collaborators, setCollaborators] = useState(currentTrip ? currentTrip.collaborators : [])
  const allUsers = Object.values(useSelector(state => state.users))
  const tripErrors = useSelector(state => state.errors.trips)
  const [redirect, setRedirect] = useState(false)
  const [newTrip, setNewTrip] = useState();
  const [currCollaborator, setCurrCollaborator] = useState()
  const [collabErrors, setCollabErrors] = useState(false)
  const [submitErrors, setSubmitErrors] = useState(false)
  const [modalTitle, setModalTitle] = useState("Create a New Trip")
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const fileRef = useRef(null);

  useEffect(() => {
      dispatch(userActions.fetchAllUsers())
      if (currentTrip) {
        setModalTitle("Edit Trip")
      }
  }, [])


  let collaboratorIds = []
  
  
  if (redirect) {
      return <Redirect to={{pathname:`/trips/show`, trip: newTrip}}/>
  }
  
  const handleFiles = async e => {
    const files = e.target.files;
    setImages(files);
    if (files.length !== 0) {
      let filesLoaded = 0;
      const urls = [];
      Array.from(files).forEach((file, index) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          urls[index] = fileReader.result;
          if (++filesLoaded === files.length) 
            setImageUrls(urls);
        }
      });
    }
    else setImageUrls([]);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(); 
      Array.from(images).forEach(image => formData.append("images", image));
      fileRef.current.value = null;

      // let collaboratorIds = []
      // allUsers.forEach(user => {
      //     if (collaborators.includes(user.email)) {
      //         collaboratorIds.push(user._id)
      //     }
      // })
      formData.append('title', title);
      formData.append('description', description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      collaborators.forEach((collaborator) => {
        formData.append('collaborators', collaborator)
      })
      
      if (!currentTrip){ 
          dispatch(composeTrips(formData))
        .then( (res) => { 
          if (res) {
            setNewTrip(res)
            dispatch(setCurrentTrip(res))
            setRedirect(true)
            setImages([]);
            setImageUrls([]);
            fileRef.current.value = null;
            setShowCreateTripModal(false)
          
        } else {
          let errors = tripErrors
          setSubmitErrors(true)
        }}
      )
      } else if (currentTrip) {
        let data = {...currentTrip, ...formData}
        dispatch(updateTrip(data))
        .then ( (res) => { 
          dispatch(setCurrentTrip(data))
          setNewTrip(data)
          setShowCreateTripModal(false)
          setImages([]);
          setImageUrls([]);
          setRedirect(true)
        })
      }
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
                }
            }
        })
    }

    const handleAdd = (e) => { 
        e.preventDefault()
        setCollabErrors(true)
        allUsers.forEach((user) => {
            if (currCollaborator === user.email) {
              debugger
                collaborators.append(user._id)
                setCollaborators(collaborators)
                // collaboratorIds = (collaboratorIds.concat(user._id))
                // const newArr = collaborators.slice()
                // const anotherNewArr = newArr.concat(user.email)
                // setCollaborators(collaborators)
                setCollabErrors(false)
                setCurrCollaborator('')
            }
        })
    }
    
    const handleChange = () => {
      setSubmitErrors(false);
      setCollabErrors(false)
    }

    const collaboratorEmail = (id) => {
      if (id){
        const collaboratorData = allUsers.find(user => user._id === id);
        return collaboratorData.email
      }
    } 

    const collaboratorsList = () => {
        return (
            <ul>
                {collaborators.map(collaborator => {
                    return (
                        <div className="friendsemail_container">
                          
                          <span>{collaboratorEmail(collaborator)}</span>
                          <button className="removefriend_button" value={collaborator} onClick={e => handleRemove(e)}>Remove</button>
                        </div>
                        )
                    })}
            </ul>
        )
    }


    
    return(
      <div className="createtrip_modal">
        <div onClick={() => setShowCreateTripModal(false)} className="close-button">
          <i className="fa-solid fa-x"></i>
        </div>

        <header className="createtrip_header">
          <div className="login-header-text">{modalTitle}</div>
        </header> 

        <form className="createtrip_form" onSubmit={e => handleSubmit(e)}>
       
            {/* <p className="tripformsubheader">Name Your Trip:</p> */}
            <input 
              className="createtrip_input" 
              type="text" 
              value={title} 
              onChange={e => {setTitle(e.target.value); handleChange()}}
              placeholder="Name Your Trip"
            />
            
            {submitErrors && 
            <p className="submiterror">{tripErrors.title}</p>}
            
            {/* <p className="tripformsubheader">Enter a description:</p> */}
            <textarea 
              className="createtrip_input description" 
              value={description} 
              onChange={e => {setDescription(e.target.value); handleChange()}}
              placeholder="Enter a Description"
            />
            {submitErrors && 
            <p className="submiterror">{tripErrors.description}</p>}

            <div className="createtrip_container_start">
              <p className="tripformsubheader">Trip Start Date:</p>
              <input 
                type="date" 
                className="createtrip_input" 
                value={startDate} 
                onChange={e => {setStartDate(e.target.value); handleChange()}}
              />
            </div>

            {submitErrors && 
            <p className="submiterror">{tripErrors.startDate}</p>}

            <div className="createtrip_container_end">
              <p className="tripformsubheader">Trip End Date:</p>
              <input 
                className="createtrip_input" 
                type="date" 
                value={endDate} 
                onChange={e => {setEndDate(e.target.value); handleChange()}}
              />
            </div>

            {submitErrors && 
            <p className="submiterror">{tripErrors.endDate}</p>}
            

            <div className='trip_image_container'>
              <span>Trip Images:</span>
              <label className="images_input_label" for="images_input_profile">Choose Files</label>
                <input 
                  className="images_input"
                  id="images_input_trip"
                  type="file" 
                  ref={fileRef}
                  accept=".jpg, .jpeg, .png" 
                  multiple 
                  onChange={handleFiles} 
                />              
            </div>
            

            <div className="createtrip friends_container">
              <p className="tripformsubheader">Add Friends:</p>
              
              <input 
                className="createtrip_input"
                type='text'
                value={currCollaborator}
                onChange={e => {setCurrCollaborator(e.target.value); handleChange()}}
                placeholder="Friend's Email"
              />

              <div className="addfriends_container">
                <button 
                  className="addfriends_button"
                  onClick={(e) => handleAdd(e)}
                >
                  Add a Friend
                </button>
              </div>

            </div>     
            <span className="errors">{collabErrors ? 'No user found with that email' : null}</span>       
            <div className="createtrip_header">Who goes on a trip:</div> 
              <div className="friends_list_container">
                <div>{collaboratorsList()}</div>
              </div>
              <button type="submit" className="continue_button" value={submit} onClick={e=> handleSubmit(e)}>Continue</button>

            {/* <input type="submit" className="tripformsubmit"  value={submit} onClick={e=> handleSubmit(e)}/> */}
        </form>
    </div>
)
}

export default NewTripFormModal;