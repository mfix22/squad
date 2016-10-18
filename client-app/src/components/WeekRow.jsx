import React from 'react'
import moment from 'moment'
import DateColumn from './DateColumn'

const WeekRow = ({days, events}) => {
  return (
    <div
      className='weekRow'
      style={{
        height: '100%',
      }}
    >
      {
        days.map((day) => {
          return (
            <DateColumn
              width={`${100 / days.length}%`}
              key={day}
              day={day}
              events={events}
            />
          )
        })
      }
    </div>
  )
}

export default WeekRow
