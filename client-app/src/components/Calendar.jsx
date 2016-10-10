import React from 'react'
import Event from './Event'

const Calendar = ({ events }) => {
  <div>
    {
      <div>
        events.map((calEvent) => {
          <Event
            key = {calEvent.id}
            {...calEvent}
          />
        })
      <div>
    }
  </div>
}

export default Calendar
