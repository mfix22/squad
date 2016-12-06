import React from 'react'
// import { connect } from 'react-redux'
import AppBar from '../AppBar'
import Form from '../Form'
import CalendarPaper from '../calendar/CalendarPaper'
import Confirmation from '../Confirmation'

const style = {
  container: {
    display: 'flex',
    minHeight: '700px',
    minWidth: '1200px',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1600px',
    width: '100%',
  }
}

const Viewer = ({ params, location, history }) => (
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

export default Viewer
