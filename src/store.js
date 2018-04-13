import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import { createLogger } from 'redux-logger'
import asyncAwait from 'redux-async-await'

import rootReducer from './reducers'

export default function configureStore(initialState = {}) {
  const middlewares = [ asyncAwait, thunk, multi ]

  if ( process.env.NODE_ENV !== 'production' ) {
    const logger = createLogger()
    middlewares.push( logger )
  }

  const enhancers = compose(
    process.env.NODE_ENV !== 'production' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  const store = applyMiddleware( ...middlewares )(createStore)(
    rootReducer,
    initialState,
    enhancers
  )

  return store;
}
