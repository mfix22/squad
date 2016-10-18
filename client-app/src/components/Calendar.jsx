import React from 'react'
import { connect } from 'react-redux'
import DateColumn from './DateColumn'
import WeekRow from './WeekRow'
import moment from 'moment'

require('../styles/app.scss');

// TODO make this not ugly
function getDateArray(numDays=7){
  return Array(numDays).fill('').map((key, index) => {
    return moment().add(index, 'd').format();
  });
}

let Calendar = ({ events }) => {
  const days = getDateArray();

  return (
    <div className="module calendar">
      <WeekRow events={events} days={days}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  events: state.events
})

Calendar = connect(mapStateToProps)(Calendar);

export default Calendar
