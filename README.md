Welcome to the Trip Club wiki!

[Live Page](https://tripclub.onrender.com)

# About

Trip Club is an trip planner app. The app allows friends to collaborate while planning a trip. A user can create a trip, add events and add friends who will go on a trip. Friends can vote up or down for events. This way all participants will get to experience only the best events.

Splash page:
![gif of splash page](frontend/src/assets/production_readme_gif/splash_page2.gif)

User experience:
![gif of user experience](frontend/src/assets/production_readme_gif/trip_index3.gif)

# Technologies Used
## MERN Stack
The application utilizes the MERN Stack - a combination of MongoDB, Express.js, React.js and Node.js. This framework choice facilitated the use of Javascript for both the front and back end. The MongoDB stores the user's information and recorded history as NoSQL objects, while the Node.js scripts are responsible for posting and fetching this data, which is subsequently displayed on the React frontend.
- Languages: JavaScript, HTML, CSS
- Frontend: React-Redux
- Routes and Backend: Express.js and MongoDB
- Hosting on Render
- Asset Storage: AWS
- Map: Google Maps


# Implementation details

## Backend
MongoDB has the following schemas:
- User
- Trip
- Event

User schema:
```javascript
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  trips: [Schema.Types.ObjectId],
  events: [Schema.Types.ObjectId],
  profileImageUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
```

Trip validation:
```javascript
const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors')

const validateTripInput = [
    check('title')
    .exists({ checkFalsy: true })
    .isLength( { min: 4, max: 40})
    .withMessage('Title must be between 4 and 40 characters'),

    check('description')
    .isLength( { min: 0, max: 140})
    .withMessage('Description must be at most 140 characters'),

    check('startDate')
    .exists({checkFalsy: true})
    .withMessage('Trip must have a Start Date'),

    check('endDate')
    .exists({checkFalsy: true})
    .withMessage('Trip must have an End Date'),

    check('lat')
    .exists({checkFalsy: true})
    .withMessage('Trip must have an location'),

    check('lng')
    .exists({checkFalsy: true})
    .withMessage('Trip must have an location'),

    check('address')
    .exists({checkFalsy: true})
    .withMessage('Trip must have an location'),

    handleValidationErrors
]

module.exports = validateTripInput
```

## Frontend
```javascript
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={SplashPage} />
        <Route exact path={'/contact'}><ContactUs /></Route> 

        <ProtectedRoute exact path="/trips/show" component={(props) => <TripShow {...props}/>}/> 
        <ProtectedRoute exact path="/profile"><ProfilePage /></ProtectedRoute>
        <ProtectedRoute exact path="/trips/:tripId/edit" component={TripEditForm} />
        <ProtectedRoute exact path="/trips/new" component={TripForm} />

      </Switch>
    </>
```

Trip index page
```javascript
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import * as  tripActions from '../../store/trips';
import { fetchAllUsers } from '../../store/users';
import { clearEvents, fetchEvents } from '../../store/events';
import TripItemCarousel from '../Trips/TripItemCarousel';
import TripFormModal from '../TripForm/TripFormModal';
import { Modal } from '../../context/Modal';
import './ProfilePage.css'


const ProfilePage = () => {
  const [showCreateTripModal, setShowCreateTripModal] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const trips = useSelector(state => Object.values(state.trips.user))
  const tripsUser = useSelector(state => state.trips.user)
  const events = useSelector(state => state.events)
  
  
  
  useEffect(() => {
    dispatch(clearEvents())
    dispatch(tripActions.clearCurrentTrip())
    dispatch(fetchEvents())
    dispatch(fetchAllUsers())

  }, [dispatch]);
  
  useEffect(() => {
    dispatch(tripActions.fetchUserTrips(currentUser?._id));
    return () => dispatch(tripActions.clearTripErrors());
  }, [currentUser, dispatch]);

  if (trips && currentUser) {
    if (trips.length == 0) {
      return (
        <div className='new_user_container'>     
          <div className='new_user_message_container'>
            <p>Welcome to the <span>TRIP CLUB!</span></p>
            <p>Let's create your first trip</p>
          </div>
          <button className="create_button" onClick={()=> setShowCreateTripModal(true)}>Create My First Trip!</button>

          {showCreateTripModal && (
          <Modal onClose={() => setShowCreateTripModal(false)}>
            <TripFormModal showCreateTripModal={showCreateTripModal} setShowCreateTripModal={setShowCreateTripModal} />
          </Modal>
        )}
        </div> 

    )} else if (trips.length > 0){
      return (
        <div className='trips_container'>

          <div className='trips_div'>
            <div className='header_message'>
              <h1 className='header_message_h2'>Your Trips</h1>
            </div>
            
            {tripsUser ? Object.values(tripsUser).map(trip => (
              <>
                <TripItemCarousel 
                key={trip?._id}
                trip={trip} 
                />
                <hr className="horizontal_line"></hr>
              </>
            )) : 
              <></>
            }

          </div>
        </div>
        
      );
    }

  } else {
    return <Redirect to="/"/>
  }
}
export default ProfilePage;
```
 
# Workflow
## 1. Hosting on Render (0.5 day)
## 2. Production README (0.5 day)
## 3. An account creation, login, logout, demo login (0.5 day)
* Users can signup and login
* Checking password and email
* Demo user login

## 4. Trips - CRUD (1 day)
* Users can create, view, update and delete trips
* A trip has a brief summary and collection of events

## 5. Events - CRUD (1 days)
* An owner of a trip can add events to a trip
* An owner of a trip can view, add, delete and update events

## 6. Voting on events - CRUD (1 day)
* Every friend can vote an event up and down 


## BONUS features
1. Comments on an event - CRUD 
2. Google Maps
3. Calendar
4. Media Upload

# Our Team
- Team Lead - [Will Davis](https://github.com/wtdavis)
- Frontend Lead - [Olga Bessonova](https://github.com/olga-bessonova)
- Backend Lead - [Zane Eisen](https://github.com/zeisen33)