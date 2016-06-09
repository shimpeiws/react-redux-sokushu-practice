import $ from 'jquery'
import { Record, List } from 'immutable'

import END_POINTS from '../lib/constants/EndPoints'
import Issue from '../lib/records/Issue'
import Label from '../lib/records/Label'
import User from '../lib/records/User'

const Actions = {
  SET_ISSUES: 'issue/set_issues',
  SET_LOADING: 'issue/set_loading',
  SET_USERS: 'issue_base/set_users',
  SET_LABELS: 'issue_base/set_labels',
}

export default Actions

function initIssues(issues) {
  return new List(issues.map((issue) => {
    return Issue.fromJS(issue)
  }))
}

function initUsers(users) {
  return new List(users.map((user) => {
    return User.fromJS(user)
  }))
}

function initLabels(labels) {
  return new List(labels.map((label) => {
    return Label.fromJS(label)
  }))
}

async function findIssuesRequest(params={}) {
  const response = await $.ajax({
    url: END_POINTS.ISSUES,
    dataType: 'json',
    data: params,
    timeout: 100000,
  })
  return initIssues(response)
}

async function findUsersRequest() {
  const response = await $.ajax({
    url: END_POINTS.USERS,
    dataType: 'json',
    timeout: 100000,
  })
  return initUsers(response)
}

async function findLabelsRequest() {
  const response = await $.ajax({
    url: END_POINTS.LABELS,
    dataType: 'json',
    timeout: 100000,
  })
  return initLabels(response)
}

function setIssues(issues) {
  return {
    type: Actions.SET_ISSUES,
    issues,
  }
}

function setLoading(loading) {
  return {
    type: Actions.SET_LOADING,
    loading,
  }
}

function setUsers(users) {
  return {
    type: Actions.SET_USERS,
    users,
  }
}

function setLabels(labels) {
  return {
    type: Actions.SET_LABELS,
    labels,
  }
}

export function findInitialData() {
  return async(dispatch) => {
    try {
      const data = await Promise.all([
        findUsersRequest(),
        findLabelsRequest(),
      ])
      dispatch(setUsers(data[0]))
      dispatch(setLabels(data[1]))
    } catch(error) {
      console.log("error", error)
    }
  }
}

export function findIssues(params, options={}) {
  return async(dispatch) => {
    const skipLoading = !!options.skipLoading

    if (!skipLoading) { dispatch(setLoading(true)) }
    try {
      const issues = await findIssuesRequest(params)
      dispatch(setIssues(issues))
    } catch (error) {
      console.log("error", error)
    }
    dispatch(setLoading(false))
  }
}
