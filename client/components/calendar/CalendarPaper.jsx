import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import Calendar from './Calendar'
import ControlBar from './ControlBar'
import Paper from '../Paper'

import { loadGoogleEvents } from '../../api'

const style = {
  minWidth: '600px',
  width: '60%',
  height: '85%',
  flexDirection: 'column',
}

const CalendarPaper = () => (
  <Paper style={style}>
    <RaisedButton
      secondary
      label="Authorize"
      onMouseUp={() => {
        loadGoogleEvents()
      }}
    />
    <ControlBar />
    <Calendar />
  </Paper>
)

export default CalendarPaper
