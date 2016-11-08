import React from 'react'

import Paper from '../Paper'
import CalendarPaper from '../calendar/CalendarPaper'

const Scheduler = () => (
  <div style={style.container}>
    <Paper style={style.form}>
      <h1>Scheduler</h1>
    </Paper>
    <CalendarPaper/>
  </div>
)

const style = {
  form: {
    minWidth: '300px',
    width: '30%',
    height: '85%',
    marginTop: '100px',
  },
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    minHeight: '700px',
    minWidth: '1000px',
    justifyContent: 'center',
  },
}

export default Scheduler
