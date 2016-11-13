import React from 'react'
import { connect } from 'react-redux'
import DateColumn from './DateColumn'
import WeekRow from './WeekRow'

import { getChunkedDays } from '../../helpers/util'

require('../../styles/app.scss');

const getNumDaysInView = (view) => {
  switch (view) {
    case "4_DAY":
      return 4
    case "WEEK":
      return 7
    case "2_WEEK":
      return 14
    case "MONTH":
    default:
      return 35
  }
}

const Calendar = ({ events, referenceDate, daysInView }) => {
  const days = getChunkedDays(referenceDate, daysInView);
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
    referenceDate : state.date.value,
    events : state.events,
    daysInView : getNumDaysInView(state.date.view)
  }
}

export default connect(mapStateToProps)(Calendar)
