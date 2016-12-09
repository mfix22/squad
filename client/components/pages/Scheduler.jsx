import React from 'react'
// import { connect } from 'react-redux'
import AppBar from '../AppBar'
import Form from '../Form'
import CalendarPaper from '../calendar/CalendarPaper'

const style = {
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
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

const Scheduler = ({ params }) => (
  <div style={style.container}>
    <AppBar params={params} />
    <div style={style.paperContainer}>
      <Form params={params} />
      <CalendarPaper />
    </div>
  </div>
)

export default Scheduler
