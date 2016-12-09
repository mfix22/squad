import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import PlaceAutocomplete from './PlaceAutocomplete'
import Paper from './Paper'
import TextField from './TextField'
import EmailList from './EmailList'
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
    textTransform: 'uppercase'
  },
  scheduleButton: {
    backgroundColor: color.green,
    width: '104px',
    margin: '16px auto 0px auto'
  }
}

const Form = ({ onClick, params }, { router }) => {
  let input
  const EDIT_FORM = !(params && params.event_id)
  return (
    <Paper style={style.form}>
      <h2 style={style.h2}>{(EDIT_FORM) ? 'Propose an Event?' : 'Vote for event times'}</h2>
      <TextField
        hintText="What are you planning?"
        floatingLabelText="What"
        fullWidth
        disabled={!EDIT_FORM}
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
      <EmailList
        hint="Emails to invite?"
        label="Who"
      />
      {/* <RadioField /> */}
      <RaisedButton
        label={EDIT_FORM ? 'Schedule' : 'Share'}
        style={style.scheduleButton}
        onClick={
          EDIT_FORM ?
            () => { onClick(input.state.value, router) } :
            () => { router.push(`/share/${params.event_id}`) }
        }
      />
    </Paper>
  )
}

const mapStateToProps = state => ({
  location: state.form.location
})

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (input, router) => {
      dispatch(sendEvent(router)(input))
    }
  }
}

Form.contextTypes = {
  router: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
