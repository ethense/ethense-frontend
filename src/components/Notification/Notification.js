import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'

export default connect(state => ({
  open: state.notification.open,
  message: state.notification.message,
}))(Snackbar)
