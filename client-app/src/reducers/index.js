import { combineReducers } from 'redux'
import events from './events'
import date from './date'
import form from './form'

const calendarReducers = combineReducers({
  date,
  events,
  form
})

export default calendarReducers
