import $ from 'jquery'
import { Record, List } from 'immutable'

import END_POINTS from '../lib/constants/EndPoints'
import Issue from '../lib/records/Issue'

const Actions = {
  SET_ISSUE: 'issue_new/set_issue',
  SET_LOADING: 'issue_new/set_loading',
}

export default Actions

const TIMEOUT = 100000

function initIssue(issue) {
  return Issue.fromJS(issue)
}

export function initializeIssue() {
  return setIssue(new Issue())
}

export function setIssue(issue) {
  return {
    type: Actions.SET_ISSUE,
    issue: issue
  }
}

export function createIssue(issue, router) {
  return async(dispatch) => {
    console.log('create Issue!')
    dispatch(setLoading(true))
    try {
      const newIssue = await createIssueRequest(issue)
      router.push(`/${newIssue.id}`)
    } catch (error) {
      console.log("error", error)
    }
    dispatch(setLoading(false))
  }
}

function setLoading(loading) {
  return {
    type: Actions.SET_LOADING,
    loading,
  }
}

async function createIssueRequest(issue) {
  const data = {
    issue: {
      title: issue.title,
      content: issue.content,
    }
  }

  const response = await $.ajax({
    url: END_POINTS.ISSUES,
    method: 'POST',
    dataType: 'json',
    data,
    timeout: TIMEOUT,
  })
  return initIssue(response)
}
