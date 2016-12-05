import React from 'react'
import { connect } from 'react-redux'
import WeekRow from './WeekRow'

import { getChunkedDays, getNumDaysInView } from '../../helpers/util'

require('../../styles/app.scss')

const Calendar = ({ events, referenceDate, daysInView }) => {
  const days = getChunkedDays(referenceDate, daysInView)
  return (
    <div className="module calendar">
      {
        days.map((week, key) => (<WeekRow key={key} events={events} numSibs={days.length} days={week} />))
      }
    </div>
  )
}

const mapStateToProps = state => ({
  referenceDate: state.view.date,
  events: state.events,
  daysInView: getNumDaysInView(state.view.date)
})

export default connect(mapStateToProps)(Calendar)
