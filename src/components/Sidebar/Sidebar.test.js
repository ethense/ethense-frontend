import React from 'react'
import { Sidebar } from './Sidebar'
import IssueCert from '../IssueCert'
import ManageAppIds from '../ManageAppIds'
import ManageUsers from '../ManageUsers'
import { Link } from 'react-router-dom'

describe('Sidebar', () => {
  const defaultProps = { logout: () => {} }
  let component

  beforeEach(() => {
    component = shallow(<Sidebar {...defaultProps} />)
  })

  it('should render', () => {
    expect(component.exists()).toBe(true)
  })

  it('should show a link for the issue cert page', () => {
    const issueNav = component.find('[data-test-id="issueNav"]')
    expect(issueNav.exists()).toBe(true)
    expect(issueNav.props().to).toBe(IssueCert.route)
  })

  it('should show a ink for the manage app identities page', () => {
    const appIdsNav = component.find('[data-test-id="appIdsNav"]')
    expect(appIdsNav.exists()).toBe(true)
    expect(appIdsNav.props().to).toBe(ManageAppIds.route)
  })

  it('should show a link for the manage users page', () => {
    const usersNav = component.find('[data-test-id="usersNav"]')
    expect(usersNav.exists()).toBe(true)
    expect(usersNav.props().to).toBe(ManageUsers.route)
  })

  it('should have a user menu button', () => {
    expect(component.find('[data-test-id="userMenuBtn"]').exists()).toBe(true)
  })

  // TODO: test menu open after button click

  it('should have a button that calls logout when clicked', () => {
    const mockLogout = jest.fn()
    component.setProps({ logout: mockLogout })
    const logoutButton = component.find('[data-test-id="logoutButton"]')
    expect(logoutButton.length).toBe(1)
    logoutButton.simulate('click')
    expect(mockLogout.mock.calls.length).toBe(1)
  })
})
