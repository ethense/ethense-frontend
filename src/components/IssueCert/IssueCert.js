import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../modules/authentication'

export class IssueCert extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.logout}>logout</button>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    logout() {
      dispatch(logout())
    },
  })
)(IssueCert)
