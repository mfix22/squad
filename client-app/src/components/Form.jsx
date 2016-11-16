import React from 'react'

import PlaceAutocomplete from './PlaceAutocomplete'
import Paper from './Paper'
import TextField from './TextField'
import TextFieldWithList from './TextFieldWithList'
import DateList from './DateList'
// import RadioField from '../RadioField'
import { color } from '../vars'
import PlainActionButtonRaised from './buttons/PlainActionButtonRaised'
// import EmojiBar from './EmojiBar'

const style = {
  form: {
    flexDirection: 'column',
    minWidth: '360px',
    width: '30%',
    height: '85%',
    padding: '24px 36px'
  },
  h2: {
    display: 'inlineBlock',
    margin: '0px 0px 16px 0px',
  },
  scheduleButton: {
    backgroundColor: color.green,
    width: '104px',
    margin: '16px auto 0px auto'
  },
  placeAutocomplete: {
    marginTop: '16px'
  }
}

const Form = (props) => {
  return (
    <Paper style={style.form}>
      <h2 style={style.h2}>Propose an Event?</h2>
      <TextField
        hintText="What are you planning?"
        floatingLabelText="What"
        fullWidth
      />
      {/* <EmojiBar /> */}
      <DateList
        hintTextDate="On what day?"
        hintTextTimeFrom="Starting at?"
        hintTextTimeTo="Until?"
      />
      <PlaceAutocomplete
        style={style.placeAutocomplete}
        hintText="Where is your event taking place?"
        floatingLabelText="Where"
        floatingLabelFixed
        fullWidth
      />
      <TextFieldWithList
        hint="Emails to invite?"
        label="Who"
      />
      {/* <RadioField /> */}
      <PlainActionButtonRaised
        label="Schedule"
        style={style.scheduleButton}
        onClick={props.onSubmit}
      />
    </Paper>
  )
}

// const mapDispatchToProps = dispatch ({
//   onSubmit:
// })

export default Form
