import React from 'react'
import { connect } from 'react-redux'

import Base from './Base'

import { fetchEvent, loadAllGoogleEvents } from '../../api'

class Viewer extends React.Component {

  componentWillMount() {
    this.props.onLoad()
  }

  render() {
    const { params } = this.props
    return (
      <Base params={params}>{this.props.children}</Base>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: () => {
    dispatch(fetchEvent(ownProps.params.event_id)).then(() => {
      dispatch(loadAllGoogleEvents())
    })
  }
})

export default connect(null, mapDispatchToProps)(Viewer)
