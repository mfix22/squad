import React from 'react'

const Event = ({ details }) => {
  return (
    <div
      className="calendarEvent"
      style={{
        color: 'white',
        backgroundColor: details.color || '#1c4b9c',
      }}
    >
      <p className="event_title">{ details.title }</p>
      {
        /* <p className="event_time">{ moment(details.time).format('LT YYYY ddd, MMM Do') }</p>
        <p className="event_location">{ details.location }</p>*/
      }
    </div>
  )
}

export default Event
