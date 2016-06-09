import $ from 'jquery'
import { Record, List } from 'immutable'

import END_POINTS from '../lib/constants/EndPoints'
import Issue from '../lib/records/Issue'
import Comment from '../lib/records/Comment'

const Actions = {
  SET_ISSUE_DETAIL: 'issue_detail/set_issue_detail',
  SET_COMMENTS: 'issue_detail/set_comments',
  SET_TITLE_EDITING: 'issue_detail/set_title_editing',
  SET_LOADING: 'issue_detail/set_loading',
  SET_SHOW_USERS_MODAL: 'issue_detail/set_show_users_modal',
  SET_SHOW_LABELS_MODAL: 'issue_detail/set_show_labels_modal',
}

export default Actions

function initIssueDetail(issueDetail) {
  return Issue.fromJS(issueDetail)
}

async function findIssueDetailRequest(issueId) {
  const response = await $.ajax({
    url: `${END_POINTS.ISSUES}/${issueId}`,
    method: 'GET',
    dataType: 'json',
    timeout: 100000,
  })
  return initIssueDetail(response)
}

async function updateIssueRequest(issue) {
  const data = {
    issue: {
      id: issue.id,
      title: issue.title,
      status: issue.status,
      assignee_id: issue.assignee.id,
      label_ids: issue.labels.map((label) => label.id).toArray()
    }
  }

  const response = await $.ajax({
    url: `${END_POINTS.ISSUES}/${issue.id}`,
    method: 'PATCH',
    data,
    timeout: 100000,
  })

  return initIssueDetail(response)
}

function buildCommentRequestData(comment) {
  return {
    comment: {
      user_name: comment.userName,
      content: comment.content,
    },
  }
}

async function postCommentRequest(issue, comment) {
  const response = await $.ajax({
    url: `${END_POINTS.ISSUES}/${issue.id}/comments`,
    method: 'POST',
    data: buildCommentRequestData(comment),
    timeout: 100000,
  })

  return Comment.fromJS(response)
}

async function putCommentRequest(issue, comment) {
  const response = await $.ajax({
    url: `${END_POINTS.ISSUES}/${issue.id}/comments/${comment.id}`,
    method: 'PUT',
    data: buildCommentRequestData(comment),
    timeout: 100000,
  })

  return Comment.fromJS(response)
}

async function deleteCommentRequest(issue, comment) {
  await $.ajax({
    url: `${END_POINTS.ISSUES}/${issue.id}/comments/${comment.id}`,
    method: 'DELETE',
    timeout: 100000,
  })
}

function setIssueDetail(issueDetail) {
  return {
    type: Actions.SET_ISSUE_DETAIL,
    issueDetail,
  }
}

function setComments(comments) {
  return {
    type: Actions.SET_COMMENTS,
    comments,
  }
}

function setTitleEditing(editing) {
  return {
    type: Actions.SET_TITLE_EDITING,
    editing,
  }
}

function setLoading(loading) {
  return {
    type: Actions.SET_LOADING,
    loading,
  }
}

export function findIssueDetail(issueId) {
  return async(dispatch) => {
    dispatch(setLoading(true))
    try {
      const issueDetail = await findIssueDetailRequest(issueId)
      dispatch(setIssueDetail(issueDetail))
    } catch(error) {
      console.log("error", error)
    }
    dispatch(setLoading(false))
  }
}

export function addComment(issueDetail, comment) {
  return async(dispatch) => {
    const prevComments = issueDetail.comments

    try {
      const newComment = await postCommentRequest(issueDetail, comment)
      dispatch(setComments(prevComments.push(newComment)))
    } catch (error) {
      console.log("error", error)
      dispatch(setComments(prevComments)) // fallback to previous state
    }
  }
}

export function updateComment(issueDetail, comment) {
  return async(dispatch) => {
    const prevComments = issueDetail.comments

    try {
      const newComment = await putCommentRequest(issueDetail, comment)
      const nextComments = prevComments.update(
        prevComments.findIndex((target) => {
          return target.id === newComment.id
        }),
        (_comment) => {
          return newComment
        }
      )
      dispatch(setComments(nextComments))
    } catch (error) {
      console.log("error", error)
      dispatch(setComments(prevComments)) // fallback to previous state
    }
  }
}

export function deleteComment(issueDetail, comment) {
  return async(dispatch) => {
    const prevComments = issueDetail.comments
    const nextComments = prevComments.delete(
      prevComments.findIndex((target) => {
        return target.id === comment.id
      })
    )
    dispatch(setComments(nextComments))

    try {
      await deleteCommentRequest(issueDetail, comment)
    } catch (error) {
      console.log("error", error)
      dispatch(setComments(prevComments)) // fallback to previous state
    }
  }
}

export function changeTitleEditing(editing) {
  return async(dispatch) => {
    dispatch(setTitleEditing(editing))
  }
}

export function updateIssue(issueDetail) {
  return async(dispatch) => {
    dispatch(setIssueDetail(issueDetail))
    try {
      await updateIssueRequest(issueDetail)
    } catch (error) {
      console.log("error", error)
    }
  }
}

export function setShowUsersModal(show) {
  return {
    type: Actions.SET_SHOW_USERS_MODAL,
    show,
  }
}

export function setShowLabelsModal(show) {
  return {
    type: Actions.SET_SHOW_LABELS_MODAL,
    show,
  }
}
