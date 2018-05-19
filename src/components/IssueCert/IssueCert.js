import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../modules/authentication'
import { SidebarLayout } from '../../layouts'
import GradientButton from '../GradientButton'

export class IssueCert extends Component {
  render() {
    return <SidebarLayout>
      <GradientButton data-test-id="issueBtn" variant="raised">Issue</GradientButton>
    </SidebarLayout>
  }
}

IssueCert.propTypes = {}

IssueCert.route = '/issue'

export default connect(state => ({}), dispatch => ({}))(IssueCert)
