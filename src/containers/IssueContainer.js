import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  findInitialData,
} from '../actions/issue'

class IssueContainer extends Component {
  componentDidMount() {
    this.init()
  }

  init() {
    this.props.findInitialData()
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    findInitialData,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueContainer)
