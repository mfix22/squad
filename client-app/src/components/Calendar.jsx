import React from 'react'
import { connect } from 'react-redux'
import DateColumn from './DateColumn'
import WeekRow from './WeekRow'
import moment from 'moment'

require('../styles/app.scss');

// TODO make this not ugly
function getDateArray(numDays=7, startIndex=0){
  return Array(numDays).fill('').map((key, index) => {
    return moment().add(index + startIndex, 'd').format();
  });
}

let Calendar = ({ events }) => {
  return (
    <div className="module calendar">
      <WeekRow events={events} days={getDateArray(7,0)}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  events: state.events
})

Calendar = connect(mapStateToProps)(Calendar);

export default Calendar
