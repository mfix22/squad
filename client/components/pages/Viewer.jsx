import React from 'react'
import { connect } from 'react-redux'

import AppBar from '../AppBar'
import Form from '../Form'
import CalendarPaper from '../calendar/CalendarPaper'
import Confirmation from '../Confirmation'

import { fetchEvent, loadAllGoogleEvents } from '../../api'
import style from './pageStyles'

class Viewer extends React.Component {

  componentWillMount() {
    this.props.onLoad()
  }

  render() {
    const { params, location } = this.props
    return (
      <div style={style.container}>
        <AppBar params={params} />
        <div style={style.paperContainer}>
          <Form params={params} />
          <CalendarPaper />
        </div>
        { /* TODO reorganize routes */ }
        <Confirmation location={location} params={params} />
      </div>
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
