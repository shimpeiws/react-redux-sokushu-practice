import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import styles from './IssueDescription.scss'

class IssueDescription extends Component {
  render() {
    const { issue } = this.props

    return (
      <div styleName="base">
        <div styleName="header">
          issue description
        </div>
        <div styleName="main">
          { issue.content }
        </div>
      </div>
    )
  }
}

export default CSSModules(IssueDescription, styles)
