import GoogleMap from '../GoogleMap'

function EventItem (props)  {
  let lng = -73.99376925185645;
  let lat = 40.73631643149453;
    
  let startTime = new Date(props.event.startTime).toDateString()
  let endTime = new Date(props.event.endTime).toDateString()
    if (props.event instanceof Date){
    return (
        <div className="dateseperator">
            <p className="dateseperatortext">{props.event.toDateString()}</p>
        </div>
    )} else {
      return (
        <div className="eventitembox">
            <p id="eventitemtitle" className="eventitemitem">{props.event.title}</p>
            <p className="eventitemitem description">{props.event.description}</p>
            {/* <p className="eventitemitem">{startTime}</p>
            <p className="eventitemitem">{endTime}</p> */}
            <div className="eventitemitem_container">

              <span className="eventitemitem date">{startTime}</span>
              -
              <span className="eventitemitem">{endTime}</span>
            </div>

            <div className='google-map-container'>
              <GoogleMap lng={lng} lat={lat}/>
            </div>

        </div>
      )  
    }
}

export default EventItem