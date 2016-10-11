import React from 'react'
import moment from 'moment'
import Event from './Event'


const DateColumn = ({day, events, width}) => {
  return (
    <div
      style={{
        display : 'inline-block',
        width: width,
        height: '100%'
      }}
    >
      <p>{moment(day).format('dddd M/D')}</p>
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
