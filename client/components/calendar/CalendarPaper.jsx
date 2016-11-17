import React from 'react'

import Calendar from './Calendar'
import ControlBar from './ControlBar'
import Paper from '../Paper'

const style = {
  minWidth: '600px',
  width: '60%',
  height: '85%',
  flexDirection: 'column',
}

const CalendarPaper = () => (
  <Paper style={style}>
    <ControlBar />
    <Calendar />
  </Paper>
)

export default CalendarPaper
