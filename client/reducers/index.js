import { combineReducers } from 'redux'
import events from './events'
import view from './view'
import form from './form'
import users from './users'
import emails from './emails'

const calendarReducers = combineReducers({
  view,
  events,
  form,
  users,
  emails
})

export default calendarReducers
