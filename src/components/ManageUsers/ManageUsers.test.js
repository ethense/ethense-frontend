import React from 'react'
import faker from 'faker'

import { ManageUsers } from './ManageUsers'

const defaultProps = {
  getUsers: () => {},
  users: [],
}

const USERS = [
  { id: 0, email: faker.internet.email() },
  { id: 1, email: faker.internet.email() },
  { id: 2, email: faker.internet.email() },
]

const getShallowComponent = props =>
  shallow(<ManageUsers {...defaultProps} {...props} />)

describe('Manage Users page', () => {
  it('should have a primary action button', () => {
    const component = getShallowComponent()
    expect(component.find('[data-test-id="addUserBtn"]').exists()).toBe(true)
  })

  it('should request a list of users', () => {
    const mockGetUsers = jest.fn()
    const component = getShallowComponent({ getUsers: mockGetUsers })
    expect(mockGetUsers.mock.calls.length).toBe(1)
  })

  it('should display a table with a user in each row', () => {
    const component = getShallowComponent({ users: USERS })
    const usersTable = component.find('[data-test-id="usersTableBody"]')
    expect(usersTable.exists()).toBe(true)
    expect(usersTable.children().length).toBe(USERS.length)
  })
})
