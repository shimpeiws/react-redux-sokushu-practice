import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import Comment from '../lib/records/Comment'
import { STATE } from '../lib/records/Issue'

import styles from './IssueCommentForm.scss'

class IssueCommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      content: '',
    }
  }

  onClickComment() {
    const comment = Comment.fromJS(this.state)
    this.props.onClickComment(comment)
  }

  onClickChangeStatus(status) {
    this.props.onClickChangeStatus(
      this.props.issue.set('status', status)
    )
  }

  onChangeUserName(e) {
    this.setState({userName: e.target.value})
  }

  onChangeContent(e) {
    this.setState({content: e.target.value})
  }

  render() {
    const { issue } = this.props
    return (
      <div styleName="base">
        <div styleName="header">
          <span styleName="input-label">
            User Name
          </span>
          <span styleName="user-input">
            <input
              type="text"
              value={this.state.userName}
              onChange={this.onChangeUserName.bind(this)}
              disabled={issue.status === STATE.OPEN ? false : true}
            />
          </span>
        </div>
        <div styleName="main">
          <div styleName="input-label">
            Comment Here
          </div>
          <textarea
            styleName="comment-text"
            value={this.state.editingContent}
            onChange={this.onChangeContent.bind(this)}
            disabled={issue.status === STATE.OPEN ? false : true}
          />
        </div>
        <div styleName="footer">
          { issue.status === STATE.OPEN ? (
            <div
              styleName="close-issue-button"
              onClick={this.onClickChangeStatus.bind(this, STATE.CLOSE)}
            >
              Close Issue
            </div>) : (<div
              styleName="close-issue-button"
              onClick={this.onClickChangeStatus.bind(this, STATE.OPEN)}
            >
              Re-open Issue
            </div>)
          }
          <div
            styleName="comment-button"
            onClick={this.onClickComment.bind(this)}
          >
            Comment
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(IssueCommentForm, styles)
