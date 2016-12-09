import React from 'react'
import { connect } from 'react-redux'

import AppBar from '../AppBar'
import Form from '../Form'
import CalendarPaper from '../calendar/CalendarPaper'
import Confirmation from '../Confirmation'

import { fetchEvent } from '../../api'
import style from './pageStyles'

const Viewer = ({ onLoad, params, location }) => {
  onLoad(params.event_id)
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

const mapDispatchToProps = dispatch => ({
  onLoad: (id) => {
    dispatch(fetchEvent(id))
  }
})

export default connect(null, mapDispatchToProps)(Viewer)
