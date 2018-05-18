import React from 'react'
import IssueCert from '../IssueCert'
import ManageAppIds from '../ManageAppIds'
import ManageUsers from '../ManageUsers'
import { Link } from 'react-router-dom'

const Sidebar = props => (
  <div>
    <Link to={IssueCert.route}>Issue Cert</Link>
    <Link to={ManageAppIds.route}>App Identities</Link>
    <Link to={ManageUsers.route}>Users</Link>
  </div>
)

export default Sidebar
