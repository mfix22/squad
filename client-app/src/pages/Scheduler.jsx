import React from 'react'

import Paper from '../components/Paper'
import AppBar from '../components/AppBar'
import TextField from '../components/TextField'
import RadioField from '../components/RadioField'
import { color } from '../vars'

import Calendar from '../components/Calendar'
import NextButton from '../components/Buttons/NextButton'
import PrevButton from '../components/Buttons/PrevButton'
import TodayButton from '../components/Buttons/TodayButton'
import PlainActionButtonRaised from '../components/Buttons/PlainActionButtonRaised'

const Scheduler = () => (
  <div style={style.container}>
    <AppBar />
    <div style={style.paperContainer}>
      <Paper style={style.form}>
        <h2 style={style.h2}>Propose an Event</h2>
        <TextField hint="What are you planning?" label="What" />
        <TextField hint="At what time?" label="When" />
        <TextField hint="Where at?" label="Where" />
        <TextField hint="Emails to invite?" label="Who" />
        {/* <RadioField /> */}
        <PlainActionButtonRaised label="Schedule" style={style.scheduleButton} />
      </Paper>
      <Paper style={style.calendar}>
        <div style={style.buttons}>
          <PrevButton style={{ width: '40px' }} />
          <TodayButton style={{ width: '100px' }} />
          <NextButton style={{ width: '40px' }} />
        </div>
        <Calendar />
      </Paper>
    </div>
  </div>
)

const style = {
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  calendar: {
    minWidth: '600px',
    width: '60%',
    height: '85%',
  },
  form: {
    flexDirection: 'column',
    minWidth: '300px',
    width: '30%',
    height: '85%',
    padding: '24px 36px'
  },
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    minHeight: '700px',
    minWidth: '1000px',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  h2: {
    display: 'inlineBlock',
    margin: '0',
  },
  scheduleButton: {
    backgroundColor: color.green,
    width: '104px',
    margin: '16px auto 0px auto'
  }
}

export default Scheduler
