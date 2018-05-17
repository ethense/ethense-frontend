
import React from 'react'
import ManageUsers from './ManageUsers'

describe('Manage Users', () => {
  it('should render', () => {
    const component = shallow(<ManageUsers/>)
    expect(component.exists()).toBe(true)
  })
})
