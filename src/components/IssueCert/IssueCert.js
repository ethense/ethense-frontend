import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../modules/authentication'
import { SidebarLayout } from '../../layouts'

export class IssueCert extends Component {
  render() {
    return <SidebarLayout>issue cert</SidebarLayout>
  }
}

IssueCert.propTypes = {}

IssueCert.route = '/issue'

export default connect(state => ({}), dispatch => ({}))(IssueCert)
