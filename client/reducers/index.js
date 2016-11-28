import { combineReducers } from 'redux'
import events from './events'
import date from './date'
import form from './form'
import users from './users'

const calendarReducers = combineReducers({
  date,
  events,
  form,
  users,
})

export default calendarReducers
