import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'

import IssueListItem from './IssueListItem'
import styles from './IssueList.scss'

class IssueList extends Component {
  render() {
    const { issues } = this.props

    return(
      <div styleName="base">
        <div styleName="header">
          <div styleName="row">id</div>
          <div styleName="row-3">title</div>
          <div styleName="row-2">status</div>
          <div styleName="row">assignee</div>
          <div styleName="row">comment count</div>
          <div styleName="row-3">created</div>
          <div styleName="row-3">updated</div>
        </div>
        {
          issues.map((issue) => {
            return (<IssueListItem
              key={issue.id}
              issue={issue}
              onClickRow={this.props.onClickRow.bind(null, issue)}
            />)
          })
        }
      </div>
    )
  }
}

export default CSSModules(IssueList, styles)
