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
    const { params, users } = this.props
    this.props.onLoad(params.event_id, users)
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

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  onLoad: (id, users) => {
    dispatch(fetchEvent(id))
    dispatch(loadAllGoogleEvents(users))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
