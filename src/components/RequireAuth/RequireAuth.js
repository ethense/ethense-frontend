import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { storageService } from '../../services/StorageService'
import { refreshLogin } from '../../modules/authentication'

export default function(ComposedComponent, redirectRoute, requiredRoles = []) {
  class Authentication extends Component {
    constructor(props) {
      super(props)
      const authInfo = storageService.getAuthInfo()
      if (!props.loggedIn && !!authInfo) {
        props.refreshLogin(authInfo)
      }
    }

    checkRedirect(props) {
      const authInfo = storageService.getAuthInfo()
      if (!authInfo && !props.loggedIn) {
        this.props.history.push(redirectRoute)
      }
    }

    componentWillMount() {
      this.checkRedirect(this.props)
    }

    componentWillupdate(nextProps) {
      this.checkRedirect(nextProps)
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  Authentication.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    refreshLogin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  return connect(
    state => ({ loggedIn: state.authentication.loggedIn }),
    dispatch => ({ refreshLogin: authInfo => dispatch(refreshLogin(authInfo)) })
  )(withRouter(Authentication))
}
