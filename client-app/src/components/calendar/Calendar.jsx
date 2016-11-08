import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DateColumn from './DateColumn'
import WeekRow from './WeekRow'

require('../../styles/app.scss');

function getDateArray(numDays=7, startIndex=0){
  return [...Array(numDays).keys()].map((key, index) => {
    return moment().add(index + startIndex, 'd').format();
  });
}

const chunk = (a, c) => {
  return a.reduce((accum, next, i) => {
    const intI = Math.floor(i / c)
    return Object.assign([], accum, {
      [intI] : [...accum[intI], next]
    })
  }, Array(Math.ceil(a.length / c)).fill([]))
}

function getDays(refDate, numDays = 42) {
  // if numDays < 10, create a week view with dayOfTheWeek offset
  if (numDays <= 10) return [[...Array(numDays).keys()].map((offset) => moment(refDate).day(offset).format())]
  const numWeeks = Math.ceil(numDays / 7);
  const correctedNumDays = numWeeks * 7

  return [...Array(correctedNumDays).keys()].map(i => i - moment(refDate).date())
                                   .map(offset => moment(refDate).day(offset).format())
                                   .reduce((accum, next, i) => {
                                     const intI = Math.floor(i / 7)
                                     return Object.assign([], accum, {
                                       [intI] : [...accum[intI], next]
                                     })
                                   }, Array(numWeeks).fill([]))
}

const Calendar = ({ events, referenceDate, daysInView }) => {
  const days = getDays(referenceDate, daysInView);
  return (
    <div className="module calendar">
      {
        days.map((week, key) => (<WeekRow key={key} events={events} numSibs={days.length} days={week}/>))
      }
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
