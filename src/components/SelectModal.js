import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import Modal from 'react-modal'

class SelectModal extends Component {

  render() {
    return <Modal isOpen={this.props.isOpen}
    onRequestClose={this.props.onRequestClose}
    style={styles}>
      {this.props.children}
  </Modal>
  }
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3000,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '880px',
    height: '681px',
    margin: '-340px -440px 0',
    padding: '0',
    border: 'none',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
  }
}

export default SelectModal
