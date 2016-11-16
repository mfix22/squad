import React from 'react'

import PlaceAutocomplete from './PlaceAutocomplete'
import Paper from './Paper'
import TextField from './TextField'
import TextFieldWithList from './TextFieldWithList'
import DateList from './DateList'
// import RadioField from '../RadioField'
import { color } from '../vars'
import PlainActionButtonRaised from './buttons/PlainActionButtonRaised'
import EmojiBar from './EmojiBar'

const style = {
  form: {
    flexDirection: 'column',
    minWidth: '300px',
    width: '30%',
    height: '85%',
    padding: '24px 36px'
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

const Form = props => {
  return (
    <Paper style={style.form}>
      <h2 style={style.h2}>Propose an Event?</h2>
      <TextField hint="What are you planning?" label="What" />
      <EmojiBar />
      {/* <TextFieldWithList hint="At what time(s)?" label="When" /> */}
      <DateList hintTextDate="On what day?" hintTextTimeFrom="Starting at?" hintTextTimeTo="Until?" />
      <PlaceAutocomplete />
      <TextFieldWithList hint="Emails to invite?" label="Who" />
      {/* <RadioField /> */}
      <PlainActionButtonRaised label="Schedule" style={style.scheduleButton} />
    </Paper>
  )
}

export default Form
