import React from 'react'
// import { connect } from 'react-redux'
import AppBar from '../AppBar'
import Form from '../Form'
import CalendarPaper from '../calendar/CalendarPaper'

import style from './pageStyles'

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
