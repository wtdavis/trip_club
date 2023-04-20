function EventItem (props)  {
    
    if (props.event instanceof Date){
    return (
        <div className="dateseperator">
            <p className="dateseperatortext">{props.event.toDateString()}</p>
        </div>
    )} else {
      return (
        <div className="eventitembox">
            <p className="eventitemitem">{props.event.title}</p>
            <p className="eventitemitem">{props.event.description}</p>
            <p className="eventitemitem">{props.event.startTime}</p>
            <p className="eventitemitem">{props.event.endTime}</p>
        </div>
      )  
    }
}

export default EventItem