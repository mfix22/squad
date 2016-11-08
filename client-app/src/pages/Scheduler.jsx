import React from 'react'

import Calendar from '../components/Calendar'
import NextButton from '../components/Buttons/NextButton'
import PrevButton from '../components/Buttons/PrevButton'
import TodayButton from '../components/Buttons/TodayButton'
import Paper from '../components/Paper'

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
