import React from 'react'

// import PlaceAutocomplete from './PlaceAutocomplete'
import Paper from './Paper'
import TextField from './TextField'
import TextFieldWithList from './TextFieldWithList'
import DateList from './DateList'
// import RadioField from '../RadioField'
import { color } from '../vars'
import PlainActionButtonRaised from './Buttons/PlainActionButtonRaised'

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

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Paper style={style.form}>
        <h2 style={style.h2}>Propose an Event?</h2>
        <TextField hint="What are you planning?" label="What" />
        {/* <TextFieldWithList hint="At what time(s)?" label="When" /> */}
        <DateList hintTextDate="On what day?" hintTextTimeFrom="Starting at?" hintTextTimeTo="Until?" />
        {/* <PlaceAutocomplete /> */}
        <TextFieldWithList hint="Emails to invite?" label="Who" />
        {/* <RadioField /> */}
        <PlainActionButtonRaised label="Schedule" style={style.scheduleButton} />
      </Paper>
    )
  }
}

export default Form
