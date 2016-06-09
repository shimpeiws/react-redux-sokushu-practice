import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import _ from 'lodash'
import 'babel-polyfill'


import IssueContainer from '../containers/IssueContainer'
import IssueListContainer from '../containers/IssueListContainer'
import IssueDetailContainer from '../containers/IssueDetailContainer'
import IssueNewContainer from '../containers/IssueNewContainer'
import configureStore from '../stores/configureIssueStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={IssueContainer}>
        <IndexRoute component={IssueListContainer} />
        <Route path="/new" component={IssueNewContainer} />
        <Route path="/:id" component={IssueDetailContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)
