import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'

import Modal from './SelectModal'

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
    // TODO: implement
  }

  onChangeLabelFilter(label) {
    // TODO: implement
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
              <div
                styleName="modal-close-btn"
                onClick={this.onChangeAssigneeModal.bind(this, false)}
              >close</div>
              {
                issueManager.users.map((user) => {
                  return (
                    <li
                      key={user.id}
                      styleName="modal-item"
                      onClick={this.onChangeAssigneeFilter.bind(this, user)}
                    >{user.name}
                      { this.isAssigneeFilter(user) ? <i styleName="modal-item-check" className="fa fa-check-circle-o" /> : (null)}
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
              <div
                styleName="modal-close-btn"
                onClick={this.onChangeLabelModal.bind(this, false)}
              >close</div>
              {
                issueManager.labels.map((label) => {
                  return (
                    <li
                      key={label.id}
                      styleName="modal-item"
                      onClick={this.onChangeLabelFilter.bind(this, label)}
                    >{label.name}
                      { this.isLabelFilter(label) ? <i styleName="modal-item-check" className="fa fa-check-circle-o" /> : (null)}
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
