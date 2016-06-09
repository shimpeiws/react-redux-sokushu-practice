import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import issue from './issue'

export default combineReducers({
  issue,
  routing: routerReducer,
})
