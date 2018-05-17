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

IssueCert.propTypes = {
  logout: PropTypes.func.isRequired,
}

IssueCert.route = '/issue'

export default connect(
  state => ({}),
  dispatch => ({
    logout() {
      dispatch(logout())
    },
  })
)(IssueCert)
