import React from 'react'
import Sidebar from './Sidebar'
import IssueCert from '../IssueCert'
import { Link } from 'react-router-dom'

describe('Sidebar', () => {
  it('should render', () => {
    const component = shallow(<Sidebar />)
    expect(component.exists()).toBe(true)
  })

  it('should show a Link for the issue cert page', () => {
    const component = shallow(<Sidebar />)
    const issueLink = component.find(Link)
    expect(issueLink.length).toBe(1)
    expect(issueLink.props().to).toBe(IssueCert.route)
  })
})
