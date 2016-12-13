import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'

import Calendar from './Calendar'
import ControlBar from './ControlBar'
import Paper from '../Paper'

import { authorizeThenLoadGoogleEvents, authorize, sendToken } from '../../api'

const style = {
  padding: '0',
  margin: '0 0 0 8px',
  minWidth: '600px',
  width: '65%',
  height: '85%',
  flexDirection: 'column',
}

const CalendarPaper = ({ authorized, params, onAddAuth, onAuthorize }) => (
  <Paper style={style}>
    {
      (authorized) ?
        (
          <div>
            <ControlBar />
            <Calendar />
            <RaisedButton
              icon={<ActionAndroid />}
              secondary
              label="Authorize"
              onMouseUp={() => { onAddAuth(params.event_id) }}
            />
          </div>
        ) :
        (
          <RaisedButton
            icon={<ActionAndroid />}
            secondary
            label="Authorize"
            onMouseUp={onAuthorize}
          />
        )
    }
  </Paper>
)

const mapStateToProps = state => ({
  authorized: state.users.length
})

const mapDispatchToProps = dispatch => ({
  onAuthorize: () => {
    dispatch(authorizeThenLoadGoogleEvents())
  },
  onAddAuth: (id) => {
    authorize().then((response) => {
      dispatch(sendToken({
        id,
        token: response.Zi.access_token
      }))
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPaper)
