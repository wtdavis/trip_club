// import React, { useState } from 'react';
// import { Link, Redirect, useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import * as  tripActions from '../../store/trips';
// import GoogleMap from '../GoogleMap';
// import './Trips.css';
// import Carousel from '../Carousel/Carousel';


// const TripItemCarousel = ({trip}) => {

//   const dispatch = useDispatch();
//   // const history = useHistory;
//   const [isShow, setIsShow] = useState(false)

//   const handleCLick = (e) => {
//     e.preventDefault();
//     dispatch(tripActions.fetchTrip(trip._id))
//   }
//   const currentTrip = trip
//   const events = useSelector(state => state.events)
//   const tripEvents = Object.values(events).filter(e => e.trip === currentTrip._id)
//   let arr = tripEvents.map(event => (<li>{event.title}</li>))
//   let lng = -73.99376925185645;
//   let lat = 40.73631643149453;
//   const slides = [
//     "https://trip-club-dev.s3.amazonaws.com/trips/1/event1/1.jpg",
//     "https://trip-club-dev.s3.amazonaws.com/trips/1/event1/2.jpg",
//     "https://trip-club-dev.s3.amazonaws.com/trips/1/event1/3.jpg",
//     "https://trip-club-dev.s3.amazonaws.com/trips/1/event3/1.jpg"
//   ]

//   const handleShow = (e) => {
//     e.preventDefault();
//     setIsShow(true)
//   }
  
//   if (isShow)
//   {return(
//     <Redirect to={{pathname:`trips/show`, trip: trip}}/>)
//     }
  
//   if (currentTrip) return (
    
//       <div className="trip-item-container" > 
//         <div className='left-column'>
//           <main className='max-w-lg'>
//             <Carousel>
//               {[
//                 ...slides.map((s) => <img src={s} />)
//               ]}
//             </Carousel>

//           </main>
//         </div>

//         <div className='right-column' onClick={handleCLick}>
//           <div className="trip-link" onClick={handleShow} >
//             <div className='description-container'>
//                 <h2 className='trip-title'>{trip.title.length < 25 ? trip.title : `${trip.title.slice(0,25)}...`}</h2>
//                 {/* <p className='description-p'>{trip.description.length < 35 ? trip.description : `${trip.description.slice(0,35)}...`}</p> */}
//                 {/* <p className='price-p'><span className='price-span'>{`$${<p>{trip.cost}</p>}`}</span> night</p>            */}
//             </div>
//             <ul>
//               {tripEvents.map(event => (<li>{event.title}</li>))}
//             </ul>
          

//           </div>

//           <div className='google-map-container'>
//               <GoogleMap lng={lng} lat={lat}/>
//             </div>


//         </div>        
        
//       </div>
//   )
// };

// export default TripItemCarousel;