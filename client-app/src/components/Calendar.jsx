import React from 'react'
import { connect } from 'react-redux'
import Event from './Event'

let Calendar = ({ events }) => (
  <div>
    {
      events.map((calEvent) => {
        console.log(calEvent);
        return (
          <Event
            key={calEvent.id}
            details={calEvent}
          />
        )
      })
    }
  </div>
)

const mapStateToProps = (state) => ({
  events: state.events
})

Calendar = connect(mapStateToProps)(Calendar);

export default Calendar
