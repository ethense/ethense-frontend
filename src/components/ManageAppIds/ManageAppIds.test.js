import React from 'react'
import ManageAppIds from './ManageAppIds'

describe('Manage App Ids', () => {
  it('should render', () => {
    const component = shallow(<ManageAppIds/>)
    expect(component.exists()).toBe(true)
  })
})
