import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as  tripActions from '../../store/trips';
import GoogleMap from '../GoogleMap'
import './Trips.css';

const TripItem = ({trip}) => {

  const dispatch = useDispatch();
  // const history = useHistory;
  const [isShow, setIsShow] = useState(false)

  const handleCLick = (e) => {
    e.preventDefault();
    dispatch(tripActions.fetchTrip(trip._id))
  }

  let lng = -73.99376925185645;
  let lat = 40.73631643149453;

  const handleShow = (e) => {
    e.preventDefault();
    setIsShow(true)
  }

  if (isShow)
  {return(
    <Redirect to={{pathname:`trips/show`, jabroni: true, trip: trip}}/>)
    }
  
  if (trip) return (
    
      <div className="trip-item-container" > 
        <div className='left-column'>
          {/* <div className='trip-div' onClick={handleCLick}>
            <div className="trip-image"> 
              <img id="trip-image" src={trip.photosUrl[0]}></img>
              <img id="trip-image" src={require("../../assets/trips/1/event1/1.jpg")}></img>
            </div>          
          </div> */}
          <div className='wrapper'>
            <div className="carousel">  
              <div className='slide'>
                <a href="#item-4">Slide 4</a>
                  <img id="item-1" src={require("../../assets/trips/1/event1/1.jpg")} alt=""></img>
                <a href="#item-2">Slide 2</a>
              </div>

              <div className='slide'>
                <a href="#item-1">Slide 1</a>
                  <img id="item-2" src={require("../../assets/trips/1/event1/2.jpg")} alt=""></img>
                <a href="#item-3">Slide 3</a>
              </div>

              <div className='slide'>
                <a href="#item-2">Slide 2</a>
                  <img id="item-3" src={require("../../assets/trips/1/event1/3.jpg")} alt=""></img>
                <a href="#item-4">Slide 4</a>
              </div>

              <div className='slide'>
                <a href="#item-3">Slide 3</a>
                  <img id="item-4" src={require("../../assets/trips/1/event3/1.jpg")} alt=""></img>
                <a href="#item-1">Slide 1</a>
              </div>
            </div>  

            <nav class="carousel__nav">
              <ul>
                <li>
                  <a href="#item-1" aria-label="Item 1">
                  <svg viewBox="0 0 10 10" width="1em">
                    <circle cx="5" cy="5" r="5" fill="#fff" />
                  </svg>
                  </a>
                </li>
                <li>
                  <a href="#item-2" aria-label="Item 2">
                  <svg viewBox="0 0 10 10" width="1em">
                    <circle cx="5" cy="5" r="5" fill="#fff" />
                  </svg>
                  </a>
                </li>
                <li>
                  <a href="#item-3" aria-label="Item 3">
                  <svg viewBox="0 0 10 10" width="1em">
                    <circle cx="5" cy="5" r="5" fill="#fff" />
                  </svg>
                  </a>
                </li>
                <li>
                  <a href="#item-4" aria-label="Item 4">
                  <svg viewBox="0 0 10 10" width="1em">
                    <circle cx="5" cy="5" r="5" fill="#fff" />
                  </svg>
                  </a>
                </li>
              </ul>
            </nav>        
          </div>
        </div>

        <div className='right-column' onClick={handleCLick}>
          <div className="trip-link" onClick={handleShow} >
            <div className='description-container'>
                <h2 className='trip-title'>{trip.title.length < 25 ? trip.title : `${trip.title.slice(0,25)}...`}</h2>
                {/* <p className='description-p'>{trip.description.length < 35 ? trip.description : `${trip.description.slice(0,35)}...`}</p> */}
                {/* <p className='price-p'><span className='price-span'>{`$${<p>{trip.cost}</p>}`}</span> night</p>            */}
            </div>
            <ul>
              <li>Event 1</li>
              <li>Event 2</li>
              <li>Event 3</li>
              <li>Event 4</li>
            </ul>
          </Link>
            <div className='google-map-container'>
              <GoogleMap lng={lng} lat={lat}/>
            </div>

          </div>

        </div>        
        
      </div>
  )
};

export default TripItem;