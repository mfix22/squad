import React from 'react'
import { connect } from 'react-redux'
import DateColumn from './DateColumn'
import WeekRow from './WeekRow'
import moment from 'moment'

require('../styles/app.scss');

function getDateArray(numDays=7, startIndex=0){
  return [...Array(numDays).keys()].map((key, index) => {
    return moment().add(index + startIndex, 'd').format();
  });
}

function getDays(refDate, numDays = 42) {
  // if numDays < 10, create a week view with dayOfTheWeek offset
  return [...Array(numDays).keys()].map(i => (numDays < 10) ? i : i - moment(refDate).date())
                            .map(offset => moment(refDate).day(offset).format())
}

const Calendar = ({ events, referenceDate }) => {
  const days = getDays(referenceDate, 42);
  return (
    <div className="module calendar">
      <WeekRow events={events} days={days.slice(0,7)}/>
      <WeekRow events={events} days={days.slice(7,14)}/>
      <WeekRow events={events} days={days.slice(14,21)}/>
      <WeekRow events={events} days={days.slice(21,28)}/>
      <WeekRow events={events} days={days.slice(28,35)}/>
      <WeekRow events={events} days={days.slice(35,42)}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    referenceDate : state.date,
    events : state.events,
  }
}



export default connect(mapStateToProps)(Calendar)
