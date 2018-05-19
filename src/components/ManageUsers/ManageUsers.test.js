import React from 'react'
import { ManageUsers } from './ManageUsers'

describe('Manage Users page', () => {
  it('should have a primary action button', () => {
    const component = shallow(<ManageUsers />)
    expect(component.find('[data-test-id="addUserBtn"]').exists()).toBe(true)
  })
})
