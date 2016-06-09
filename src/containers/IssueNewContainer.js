import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from 'react-loader'

import Issue from '../lib/records/Issue'

import {
  setIssue,
  createIssue,
  initializeIssue,
} from '../actions/issueNew'

import IssueNewHeader from '../components/IssueNewHeader'

import styles from './IssueNewContainer.scss'

class IssueNewContainer extends Component {

  componentDidMount() {
    this.init()
  }

  init() {
    this.props.initializeIssue()
  }

  onChangeTitle(title) {
    this.props.setIssue(this.props.issueNewManager.issue.set('title', title))
  }

  onChangeContent(content) {
    this.props.setIssue(this.props.issueNewManager.issue.set('content', content))
  }

  onCreateIssue() {
    const issueNewManager = this.props.issueNewManager
    const issue = issueNewManager.issue
    if (!issue.isValidTitle() || !issue.isValidContent()) {
      return
    }
    if (!issueNewManager.loading) {
      this.props.createIssue(issueNewManager.issue, this.context.router)
    }
  }

  render() {
    const {issueNewManager} = this.props
    return (
      <div className={styles.base}>
        <Loader loaded={!issueNewManager.loading}>
          <Link to="/">List Page</Link>
          <IssueNewHeader
            issueNewManager={issueNewManager}
            onChangeTitle={this.onChangeTitle.bind(this)}
            onChangeContent={this.onChangeContent.bind(this)}
            onCreateIssue={this.onCreateIssue.bind(this)}
          />
        </Loader>
      </div>
    )
  }
}

IssueNewContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    issueNewManager: state.issue.issueNewManager,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setIssue,
    createIssue,
    initializeIssue,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueNewContainer, styles)
