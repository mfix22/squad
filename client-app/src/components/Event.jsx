import React from 'react'

const Event = ({title, date, location}) => {
  <div>
    <p className="event_title">{ title }</p>
    <p className="event_time">{ date }</p>
    <p className="event_location">{ location }</p>
  </div>
}

export default Event
