import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Event from './Event'

import { isThisMonth } from '../../helpers/util'

const DateColumn = ({ refDate, window, day, events, width }) => {
  const weekView = false
  return (
    <div
      className="dateColumn"
      style={{
        width,
        opacity: (isThisMonth(refDate, day) || window !== 'MONTH') ? 1 : 0.4
      }}
    >
      <div>
        <p className="header">{moment(day).format((weekView) ? 'dddd M/D' : 'M/D')}</p>
      </div>
      {
        events.filter((e) => {
          return moment(e.time).isSame(day, 'day')
        }).map((calEvent) => {
          return (
            <Event
              key={calEvent.id}
              details={calEvent}
              view={window}
            />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    refDate: state.date.value,
    window: state.date.view
  }
}

export default connect(mapStateToProps)(DateColumn)
