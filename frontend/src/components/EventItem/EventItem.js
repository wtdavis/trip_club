function EventItem (props)  {
    
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
            <p className="eventitemitem">{props.event.description}</p>
            <p className="eventitemitem">{startTime}</p>
            <p className="eventitemitem">{endTime}</p>
        </div>
      )  
    }
}

export default EventItem