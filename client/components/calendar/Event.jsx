import React from 'react'
import moment from 'moment'

const timePercentage = (time) => {
  const timeMoment = moment(time)
  const hour = timeMoment.hour()
  const minute = timeMoment.minute()

  const percent = ((((60 * hour) + minute) - (7 * 60)) * 100) / (14 * 60)
  return percent
}

const durationPercentage = (duration) => {
  const percent = ((duration || 1 * 60) * 100) / (24 * 60)
  return percent
}

const Event = ({ details, view, duration }) => {
  const getStyle = () => {
    if (view === 'MONTH') {
      return {
        color: 'white',
        backgroundColor: details.color || '#1c4b9c',
        width: '90%',
      }
    }
    return {
      color: 'white',
      backgroundColor: details.color || '#1c4b9c',
      position: (view !== 'MONTH') ? 'absolute' : 'static',
      width: '90%',
      top: `${timePercentage(details.time)}%`,
      minHeight: `${durationPercentage(duration)}%`
    }
  }

  return (
    <div
      className="calendarEvent"
      style={getStyle()}
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
