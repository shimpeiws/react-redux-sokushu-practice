import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './IssueNewHeader.scss'

class IssueNewHeader extends Component {
  constructor(props) {
    super(props)
  }

  onChangeTitle(e) {
    this.props.onChangeTitle(e.target.value)
  }

  onChangeContent(e) {
    this.props.onChangeContent(e.target.value)
  }

  onCreateIssue(e) {
    this.props.onCreateIssue()
  }

  render() {
    const {issue} = this.props.issueNewManager
    return (
      <div styleName="base">
        <div>
          <span>title:</span>
          <input
            type="text"
            value={issue.title}
            onChange={this.onChangeTitle.bind(this)}
          />
          <button onClick={this.onCreateIssue.bind(this)}>Create</button>
        </div>
        <div>
          <span>content:</span>
          <textarea
            type="text"
            value={issue.content}
            onChange={this.onChangeContent.bind(this)}
          />
        </div>
      </div>
    )
  }
}

IssueNewHeader.propTypes = {
  issueNewManager: PropTypes.object.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeContent: PropTypes.func.isRequired,
  onCreateIssue: PropTypes.func.isRequired,
}

export default CSSModules(IssueNewHeader, styles)
