import React from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import PlaceAutocomplete from './PlaceAutocomplete'
import Paper from './Paper'
import TextField from './TextField'
import TextFieldWithList from './TextFieldWithList'
import DateList from './DateList'
// import RadioField from '../RadioField'
// import PlainActionButton from './buttons/PlainActionButton'
import { color } from '../vars'
import { sendEvent } from '../api'

// import EmojiBar from './EmojiBar'

const style = {
  form: {
    flexDirection: 'column',
    minWidth: '360px',
    width: '30%',
    height: '85%',
    padding: '24px 36px',
    margin: '0 8px 0 0'
  },
  h2: {
    display: 'inlineBlock',
    margin: '0px 0px 16px 0px',
  },
  scheduleButton: {
    backgroundColor: color.green,
    width: '104px',
    margin: '16px auto 0px auto'
  }
}

const Form = ({ onClick, params }) => {
  let input
  return (
    <Paper style={style.form}>
      <h2 style={style.h2}>{'Propose an Event?'}</h2>
      <TextField
        hintText="What are you planning?"
        floatingLabelText="What"
        fullWidth
        ref={(node) => {
          input = node
        }}
      />
      {/* <EmojiBar /> */}
      <DateList
        hintTextDate="On what day?"
        hintTextTimeFrom="Starting at?"
        hintTextTimeTo="Until?"
        params={params}
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
      <RaisedButton
        label="Schedule"
        style={style.scheduleButton}
        onClick={() => { onClick(input.state.value) }}
      />
    </Paper>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (input) => {
      dispatch(sendEvent(input))
    }
  }
}

export default connect(null, mapDispatchToProps)(Form)
