import React from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'

const Notification = props => (
  <Snackbar {...props}/>
)

export default connect(
  state => ({
    open: state.notification.open,
    message: state.notification.message,
  }),
  dispatch => ({})
)(Notification)
