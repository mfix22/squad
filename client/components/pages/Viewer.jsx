import React from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'

import Base from './Base'

import { fetchEvent, loadAllGoogleEvents, authorize, sendToken } from '../../api'

const fabStyle = {
  bottom: 24,
  right: 64,
  position: 'fixed'
}

class Viewer extends React.Component {

  componentWillMount() {
    this.props.onLoad()
  }

  render() {
    const { params, onAddAuth } = this.props
    return (
      <Base params={params}>
        <FloatingActionButton
          style={fabStyle}
          onMouseUp={() => { onAddAuth(params.event_id) }}
        >
          <ActionAndroid />
        </FloatingActionButton>
        {this.props.children}
      </Base>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: () => {
    dispatch(fetchEvent(ownProps.params.event_id)).then(() => {
      dispatch(loadAllGoogleEvents())
    })
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

export default connect(null, mapDispatchToProps)(Viewer)
