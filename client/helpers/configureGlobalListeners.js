// thunk action creator, needs redux-thunk
import { GLOBAL_KEY_PRESS } from '../actions'

function listenToWindowEvent(name, mapEventToAction, filter = () => true) {
  return (dispatch) => {
    function handleEvent(e) {
      if (filter(e)) {
        dispatch(mapEventToAction(e))
      }
    }

    window.addEventListener(name, handleEvent)

    // note: returns a function to unsubscribe
    return () => window.removeEventListener(name, handleEvent)
  }
}

// turns DOM event into action,
// you can define many of those
const globalKeyPress = (e) => {
  return {
    type: GLOBAL_KEY_PRESS,
    key: e.key.toLowerCase(),
    ctrl: e.ctrlKey,
    meta: e.metaKey,
    shift: e.shiftKey,
    alt: e.altKey
  }
}

const keyFilter = (e) => {
  if (e.ctrlKey) {
    if (['w', 'd', 'm', 'j', 'k', 'l'].some(key => key === e.key.toLowerCase())) return true
  }
  if (e.shiftKey) {
    // pass
  }
  if (e.altKey) {
    // pass
  }
  if (e.metaKey) {
    // pass
  }
  return false
}

export const configureGlobalKeyPress = (store) => {
  if (store) {
    // subscribe to event
    const unlistenKeyPress = store.dispatch(listenToWindowEvent('keypress', globalKeyPress, keyFilter))
    // eventually unsubscribe
    return unlistenKeyPress
  }
  return () => {}
}

export default configureGlobalKeyPress
