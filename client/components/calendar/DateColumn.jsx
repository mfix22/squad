import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Event from './Event'

import { isThisMonth } from '../../helpers/util'

const getHeaderFormat = (window) => {
  switch (window) {
    case 'MONTH':
      return 'M/D'
    case 'WEEK':
      return 'ddd M/D'
    default:
      return 'dddd M/D'
  }
}

const DateColumn = ({ refDate, window, day, events, width }) => {
  return (
    <div
      className="dateColumn"
      style={{
        width,
        opacity: (isThisMonth(refDate, day) || window !== 'MONTH') ? 1 : 0.4,
        overflow: 'hidden'
      }}
    >
      <div>
        <p className="header">{moment(day).format(getHeaderFormat(window))}</p>
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
