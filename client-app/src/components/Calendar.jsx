import React from 'react'
import { connect } from 'react-redux'
import DateColumn from './DateColumn'
require('../styles/app.scss');

const days = ['2016-09-10', '2016-10-10', '2016-11-10', '2016-12-10'];

let Calendar = ({ events }) => (
  <div
    className="module calendar"
  >
    {
      days.map((day) => {
        return (
          <DateColumn
            width={`${100 / days.length}%`}
            key={day}
            day={day}
            events={events}
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
