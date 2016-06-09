import { combineReducers } from 'redux'
import { List } from 'immutable'

import Issue from '../lib/records/Issue'
import IssueManager from '../lib/records/IssueManager'
import IssueListManager from '../lib/records/IssueListManager'
import IssueDetailManager from '../lib/records/IssueDetailManager'
import IssueNewManager from '../lib/records/IssueNewManager'

import IssueActions from '../actions/issue'
import IssueDetailActions from '../actions/issueDetail'
import IssueNewActions from '../actions/issueNew'

function issueList(state = new List(), action) {
  switch (action.type) {
    case IssueActions.SET_ISSUES:
      return action.issues
    default:
      break // do nothing
  }
  return state
}

function issueDetail(state = new Issue(), action) {
  switch (action.type) {
    case IssueDetailActions.SET_ISSUE_DETAIL:
      return action.issueDetail
    case IssueDetailActions.SET_COMMENTS:
      return state.set('comments', action.comments)
    default:
      break // do nothing
  }
  return state
}

function issueManager(state = new IssueManager(), action) {
  switch (action.type) {
    case IssueActions.SET_USERS:
      return state.set('users', action.users)
    case IssueActions.SET_LABELS:
      return state.set('labels', action.labels)
    default:
      break // do nothing
  }
  return state
}

function issueListManager(state = new IssueListManager(), action) {
  switch (action.type) {
    case IssueActions.SET_LOADING:
      return state.set('loading', action.loading)
    default:
      break // do nothing
  }
  return state
}

function issueDetailManager(state = new IssueDetailManager(), action) {
  switch (action.type) {
    case IssueDetailActions.SET_TITLE_EDITING:
      return state.set('isTitleEditing', action.editing)
    case IssueDetailActions.SET_LOADING:
      return state.set('loading', action.loading)
    case IssueDetailActions.SET_SHOW_USERS_MODAL:
      return state.set('showUsersModal', action.show)
    case IssueDetailActions.SET_SHOW_LABELS_MODAL:
      return state.set('showLabelsModal', action.show)
    default:
      break // do nothing
  }
  return state
}

function issueNewManager(state = new IssueNewManager(), action) {
  switch (action.type) {
    case IssueNewActions.SET_ISSUE:
      return state.set('issue', action.issue)
    case IssueNewActions.SET_LOADING:
      return state.set('loading', action.loading)
    default:
      break // do nothing
  }
  return state
}


export default combineReducers({
  issueList,
  issueDetail,
  issueManager,
  issueListManager,
  issueDetailManager,
  issueNewManager,
})
