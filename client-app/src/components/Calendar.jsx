import React from 'react'
import { connect } from 'react-redux'
import DateColumn from './DateColumn'
require('../styles/app.scss');

let Calendar = ({ events }) => (
  <div>
    {
      ['2016-09-10', '2016-10-10', '2016-11-10', '2016-12-10'].map((day) => {
        return (
          <DateColumn
            width={`${100 / 4}%`}
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
