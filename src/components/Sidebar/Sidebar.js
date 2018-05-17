import React from 'react'
import IssueCert from '../IssueCert'
import { Link } from 'react-router-dom'

const Sidebar = props => (
  <div>
    <Link to={IssueCert.route}>Issue</Link>
  </div>
)

export default Sidebar
