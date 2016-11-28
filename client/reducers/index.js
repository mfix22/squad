import { combineReducers } from 'redux'
import events from './events'
import date from './date'
import form from './form'
import users from './users'
import emails from './emails'

const calendarReducers = combineReducers({
  date,
  events,
  form,
  users,
  emails
})

export default calendarReducers
