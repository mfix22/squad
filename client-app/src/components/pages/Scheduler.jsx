import React from 'react'

import Calendar from '../calendar/Calendar'
import NextButton from '../buttons/NextButton'
import PrevButton from '../buttons/PrevButton'
import TodayButton from '../buttons/TodayButton'
import Paper from '../Paper'

const Scheduler = () => (
  <div style={style.container}>
    <Paper style={style.form}>
      <h1>Scheduler</h1>
    </Paper>
    <Paper style={style.calendar}>
      <PrevButton />
      <TodayButton />
      <NextButton />
      <Calendar />
    </Paper>
  </div>
)

const style = {
  calendar: {
    minWidth: '600px',
    width: '60%',
    height: '85%',
    marginTop: '100px',
  },
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
