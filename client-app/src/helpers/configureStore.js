import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = (preloadedState) => createStore(reducer, preloadedState, applyMiddleware(thunk, createLogger()))

export default configureStore;
