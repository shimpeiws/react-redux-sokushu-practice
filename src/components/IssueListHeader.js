import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import Modal from 'react-modal'

import styles from './IssueListHeader.scss'

class IssueListHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAssigneeModal: false,
      showLabelModal: false,
    }
  }

  isAssigneeFilter(user) {
    return user.id === parseInt(this.props.userFilterId)
  }

  isLabelFilter(label) {
    return label.id === parseInt(this.props.labelFilterId)
  }

  onChangeAssigneeFilter(user) {
    if (this.isAssigneeFilter(user)) {
      this.props.onChangeAssigneeFilter(null)
    } else {
      this.props.onChangeAssigneeFilter(user)
      this.onChangeAssigneeModal(false)
    }
  }

  onChangeLabelFilter(label) {
    if (this.isLabelFilter(label)) {
      this.props.onChangeLabelFilter(null)
    } else {
      this.props.onChangeLabelFilter(label)
      this.onChangeLabelModal(false)
    }
  }

  onChangeAssigneeModal(show) {
    this.setState({
      showAssigneeModal: show,
    })
  }

  onChangeLabelModal(show) {
    this.setState({
      showLabelModal: show,
    })
  }

  render() {
    const {issueManager} = this.props
    const {showAssigneeModal, showLabelModal} = this.state
    return (
      <div styleName="base">
        <div styleName="left">
          <span styleName="item" onClick={this.props.onClickOpen}>Open</span>
          <span styleName="item" onClick={this.props.onClickClose}>Close</span>
        </div>
        <div styleName="right">
          <span styleName="item"
                onClick={this.onChangeAssigneeModal.bind(this, true)}
          >Assignee</span>
          <Modal
            isOpen={showAssigneeModal}
          >
            <ul>
              <li
                onClick={this.onChangeAssigneeModal.bind(this, false)}
              >close</li>
              {
                issueManager.users.map((user) => {
                  return (
                    <li
                      key={user.id}
                      onClick={this.onChangeAssigneeFilter.bind(this, user)}
                    >{user.name}
                      { this.isAssigneeFilter(user) ? <span> selected!</span> : (null)}
                    </li>
                  )
                })
              }
            </ul>
          </Modal>
          <span styleName="item"
                onClick={this.onChangeLabelModal.bind(this, true)}
          >Label</span>
          <Modal
            isOpen={showLabelModal}
          >
            <ul>
              <li
                onClick={this.onChangeLabelModal.bind(this, false)}
              >close</li>
              {
                issueManager.labels.map((label) => {
                  return (
                    <li
                      key={label.id}
                      onClick={this.onChangeLabelFilter.bind(this, label)}
                    >{label.name}
                      { this.isLabelFilter(label) ? <span> selected!</span> : (null)}
                    </li>
                  )
                })
              }
            </ul>
          </Modal>
          <span styleName="item">Sort</span>
          <span styleName="item"><Link to="/new">Create Issue</Link></span>
        </div>
      </div>
    )
  }
}

export default CSSModules(IssueListHeader, styles)
