import React from 'react'
import GooglePlaceAutocomplete from 'googlePlaceAutocomplete'

import Paper from '../Paper'
import AppBar from '../AppBar'
import TextField from '../TextField'
// import RadioField from '../RadioField'
import { color } from '../../vars'

import CalendarPaper from '../calendar/CalendarPaper'
import PlainActionButtonRaised from '../Buttons/PlainActionButtonRaised'

const Scheduler = () => (
  <div style={style.container}>
    <AppBar />
    <div style={style.paperContainer}>
      <Paper style={style.form}>
        <h2 style={style.h2}>Propose an Event?</h2>
        <TextField hint="What are you planning?" label="What" />
        <TextField hint="At what time?" label="When" />
        {/* <TextField hint="Where at?" label="Where" /> */}
        <GooglePlaceAutocomplete
          hintText={'Where at?'}
          onChange={() => {}}
          onNewRequest={() => {}}
          name={'location'}
        />
        <TextField hint="Emails to invite?" label="Who" />
        {/* <RadioField /> */}
        <PlainActionButtonRaised label="Schedule" style={style.scheduleButton} />
      </Paper>
      <CalendarPaper />
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
    minHeight: '700px',
    minWidth: '1000px',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1600px',
    width: '100%',
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
