import React from 'react'
import faker from 'faker'

import { ManageUsers } from './ManageUsers'

const defaultProps = {
  getUsers: () => {},
  createUser: () => {},
  editUser: () => {},
  deleteUser: () => {},
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

  describe('create user button', () => {
    it('should render', () => {
      expect(getShallowComponent().find('[data-test-id="createUserBtn"]').exists()).toBe(true)
    })

    it('should open the user form when clicked', () => {
      const component = getShallowComponent()
      const createUserBtn = component.find('[data-test-id="createUserBtn"]')
      createUserBtn.simulate('click')
      expect(component.instance().state.userDialogOpen).toBe(true)
    })
  })
})
