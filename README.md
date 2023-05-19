Welcome to the Trip Club wiki!

[Live Page](https://tripclub.onrender.com)

# About

Trip Club is an trip planner app. The app allows friends to collaborate while planning a trip. A user can create a trip, add events and add friends who will go on a trip. Friends can vote up or down for events. This way all participants will get to experience only the best events. 

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
- Search

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
  }
}, {
  timestamps: true
});
```

## Frontend
```javascript
<>
      <Navigation />
      <Switch>
        <AuthRoute exact path="/" component={SplashPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/trips" component={Trips} />       
        <ProtectedRoute exact path="/trips/new" component={TripForm} />
      </Switch>
    </>
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