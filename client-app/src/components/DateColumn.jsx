import React from 'react'
import moment from 'moment'
import Event from './Event'

const isThisMonth = (refDate, otherDate) => {
  const ref = moment(refDate);
  const day = moment(otherDate);
  return ref.month() === day.month() && ref.year() === day.year()
}

const DateColumn = ({day, events, width}) => {
  const weekView = false;
  return (
    <div
      className='dateColumn'
      style={{
        width: width,
        opacity : (isThisMonth(day)) ? 1 : 0.4
      }}
    >
      <div>
        <p className="header">{moment(day).format((weekView) ? 'dddd M/D' : 'M/D')}</p>
      </div>
      {
        events.filter((e) => {
          return moment(e.time).isSame(day, 'day');
        }).map((calEvent) => {
          return (
            <Event
              key={calEvent.id}
              details={calEvent}
            />
          )
        })
      }
    </div>
  )
}

export default DateColumn
