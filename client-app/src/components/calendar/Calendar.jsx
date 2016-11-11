import React from 'react'
import { connect } from 'react-redux'
import DateColumn from './DateColumn'
import WeekRow from './WeekRow'

import { getChunkedDays } from '../../helpers/util'

require('../../styles/app.scss');

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
    referenceDate : state.date,
    events : state.events,
  }
}

export default connect(mapStateToProps)(Calendar)
