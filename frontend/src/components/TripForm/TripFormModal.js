// import {useState, useRef, useEffect } from 'react';
import {useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { composeTrips, setCurrentTrip } from "../../store/trips"
import { useParams } from "react-router-dom"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import * as userActions from '../../store/users'
import './TripForm.css'
import { updateTrip } from "../../store/trips"
import * as eventActions from "../../store/events"
import Geocoding from "../GoogleMap/Geocoding"
import CollabList from '../Collaborator/CollabList';


const TripFormModal = (props) => {
  const {setShowCreateTripModal} = props;
  const currentTrip = (props.currentTrip ? props.currentTrip : null)
  // debugger
  const events = useSelector(state => state.events)
  // const Geocoding = lazy(() => import('../GoogleMap/Geocoding'));
    

    
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

    // set location to App Academy office by default
    const [lat, setLat] = useState(currentTrip ? currentTrip.lat : 40.73631643149453);
    const [lng, setLng] = useState(currentTrip ? currentTrip.lng : -73.99376925185645);
    const [address, setAddress] = useState(currentTrip ? currentTrip.address : '90 5th Ave, New York, NY 10011');
    const [updatedAddress, setUpdatedAddress] = useState(currentTrip ? currentTrip.address : "");
    
    // debugger
    const fileRef = useRef(null);
  
    useEffect(() => {
        dispatch(userActions.fetchAllUsers())
        if (currentTrip) {
          setModalTitle("Edit Trip")
        }
    }, [])


    const handleRedirect = (props) => {
      if (props === true) {
        return <Redirect to={{pathname:`/trips/show`, trip: newTrip}}/>
      }
    }

  // function handleLocation handles coordinates update when passed to Geocoding
    const handleLocation = (lat, lng, address) => {
      setLat(lat);
      setLng(lng);
      setAddress(address);
      // console.log('Message from TripFormModal')
      // console.log(lat);
      // console.log(lng);
      // console.log(address);
    }

    // const handleUpdatedAddress = async (e) => {
    //   e.preventDefault()

    //   console.log(address)
    //   setAddress(updatedAddress)
    //   console.log(address)
    // }

    let collaboratorIds = []

    
    
    // const author = currentUser.id
    

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
      
      let arr = []

      for (let i=0; i<collaborators.length; i++){ 
        arr = arr.concat(collaborators[i]._id)
      }

      let collaboratorIds = arr

      allUsers.forEach(user => {
        if (collaborators.includes(user.email)) {
          collaboratorIds.push(user._id)
        }
      })
      collaboratorIds.push(currentUser._id)

      formData.append('collaborators', JSON.stringify(collaboratorIds))

      let events = [];
      if (currentTrip?.events) {
        let currentEvents = currentTrip.events;
        for (let i=0;i<currentEvents.length;i++) {
          events = events.concat(currentEvents[i]._id)
        }
      }
      formData.append('events', JSON.stringify(events))
      formData.append('title', title);
      formData.append('description', description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);

      formData.append('lat', lat);
      formData.append('lng', lng);
      formData.append('address', address);
      
      
        if (!currentTrip){ 
           dispatch(composeTrips(formData))
          .then( (res) => {   
            if (res) {
              debugger
              setNewTrip(res);
              dispatch(setCurrentTrip(res));
              setImages([]);
              setImageUrls([]);
              fileRef.current.value = null;
              setRedirect(true)
              setShowCreateTripModal(false);
              handleRedirect(true)
            
          } else {
            setSubmitErrors(true)
          }}
        )
        } else if (currentTrip) {
          // let data = {...currentTrip, ...formData}
          let keys = Object.keys(currentTrip)
          for (let i = 0; i < keys.length; i++) {
            if (!(formData.has(keys[i]))) {
              formData.append(`${keys[i]}`, currentTrip[keys[i]])
            } 
          }
          dispatch(updateTrip(formData))
          .then ( (res) => { 
            debugger
            dispatch(setCurrentTrip(res));
            setNewTrip(res);
            setShowCreateTripModal(false);
            setImages([]);
            setImageUrls([]);
            setRedirect(true)
            handleRedirect(true)
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


    // const handleAdd = (e) => { 
    //     e.preventDefault()
    //     setCollabErrors(true)

    //     allUsers.forEach((user) => {
    //       //currCollaborator is an email from Friend's email input
    //         if (currCollaborator === user.email) {
    //             collaboratorIds = (collaboratorIds.concat(user._id))
    //             // newArr is a copy of collaborators. 
    //             // collaborators is an object with id, username, email  
    //             // If a trip is new collaborators=[]
    //             console.log(collaborators)
    //             console.log(collaborators)
    //             const newArr = collaborators.slice()
    //             const anotherNewArr = newArr.concat(user.email)
    //             setCollaborators(anotherNewArr)
    //             setCollabErrors(false)
    //             setCurrCollaborator('')
    //         }
    //     })
    // }

    

    const handleChange = () => {
      setSubmitErrors(false);
      setCollabErrors(false)
    }



    // const CollaboratorsList = () => {
    //     return (
    //         <ul>
    //             {collaborators.map(collaborator => {
    //                 return (
    //                     <div className="friendsemail_container">
    //                       <span>{collaborator.email}</span>
    //                       <button className="removefriend_button" value={collaborator} onClick={e => handleRemove(e)}>Remove</button>
    //                     </div>
    //                     )
    //                 })}
    //         </ul>
    //     )
    // }




    
    
      if (redirect) {
        return <Redirect to={{pathname:`/trips/show`, trip: newTrip}}/>
      }

    if (!redirect) {
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

            <div className="trip_date_container">
              <p className="tripformsubheader">Trip Start Date:</p>
              <input 
                className="createtrip_input date" 
                type="date" 
                value={startDate} 
                onChange={e => {setStartDate(e.target.value); handleChange()}}
              />

              <p className="tripformsubheader">Trip End Date:</p>
              <input 
                className="createtrip_input date" 
                type="date" 
                value={endDate} 
                onChange={e => {setEndDate(e.target.value); handleChange()}}
              />
            </div>

            {submitErrors && 
            <p className="submiterror">{tripErrors.startDate}</p>}

            {submitErrors && 
            <p className="submiterror">{tripErrors.endDate}</p>}
            

            <div className='trip_image_container'>
              <span>Trip Images</span>
              <label className="images_input_label" for="images_input_profile">Choose Files</label>
                <input 
                  className="images_input"
                  id="images_input_profile"
                  type="file" 
                  ref={fileRef}
                  accept=".jpg, .jpeg, .png" 
                  multiple 
                  onChange={handleFiles} 
                />   
                <p className="images_selected">Images Selected: {imageUrls.length > 0 ? imageUrls.length : null}</p>
                         
            </div>

            {/* <div>
              <input
                id="address_input"
                className="trip_address_input"
                type='text'
                onChange={e => {setUpdatedAddress(e.target.value)}}
                placeholder={address === '' ? "Address" : null}
                // placeholder={currentTrip ? currentTrip.address : "Address"}
                value={updatedAddress}
              />

              <button 
                className="addaddress_button"
                onClick={handleUpdatedAddress}
              >
                Update Address
              </button>
            </div> */}

            <div>
              <Geocoding currentTrip={currentTrip} locationUpdate={handleLocation}/> 
              {/* <Geocoding currentCase={props.currentTrip ? props.currentTrip : null} locationUpdate={handleLocation}/>  : null */}
              {/* <Geocoding locationUpdate={handleLocation}/>               */}

              {/* <Suspense fallback={<div>Loading...</div>}>
                <Geocoding locationUpdate={handleLocation}/> 
              </Suspense> */}
            </div>
            {submitErrors && 
            <p className="submiterror">{tripErrors.lat}</p>}

            {submitErrors && 
            <p className="submiterror">{tripErrors.lng}</p>}

            {submitErrors && 
            <p className="submiterror">{tripErrors.address}</p>}
            

            {/* <div className="createtrip friends_container">
              
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
              <div className="friends_list_container">
                <div className="createtrip_header">Who goes on a trip:</div> 
                
                <div> {CollabList({currentTrip: null, collaborators: collaborators, setCollaborators: setCollaborators})}</div>

              </div> */}


              <button type="submit" className="continue_button" value={submit} onClick={e=> handleSubmit(e)}>Continue</button>

            {/* <input type="submit" className="tripformsubmit"  value={submit} onClick={e=> handleSubmit(e)}/> */}
        </form>
    </div>
)}

}

export default TripFormModal;