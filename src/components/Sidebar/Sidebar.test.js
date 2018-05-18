import React from 'react'
import Sidebar from './Sidebar'
import IssueCert from '../IssueCert'
import ManageAppIds from '../ManageAppIds'
import ManageUsers from '../ManageUsers'
import { Link } from 'react-router-dom'

describe('Sidebar', () => {
  let component

  beforeEach(() => {
    component = shallow(<Sidebar />)
  })

  it('should render', () => {
    expect(component.exists()).toBe(true)
  })

  it('should show a Link for the issue cert page', () => {
    const issueLink = component.find({ to: IssueCert.route })
    expect(issueLink.is(Link)).toBe(true)
  })

  it('should show a Link for the manage app identities page', () => {
    const appIdsLink = component.find({ to: ManageAppIds.route })
    expect(appIdsLink.is(Link)).toBe(true)
  })

  it('should show a Link for the manage users page', () => {
    const usersLink = component.find({ to: ManageUsers.route })
    expect(usersLink.is(Link)).toBe(true)
  })

  it('should have a user menu button', () => {
    expect(component.find('[data-test-id="userMenuBtn"]').exists()).toBe(true)
  })
  // TODO: test menu open after button click
})
