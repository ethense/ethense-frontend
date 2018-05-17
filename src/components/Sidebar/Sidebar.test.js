import React from 'react'
import Sidebar from './Sidebar'

describe('Sidebar', () => {
  it('should render', () => {
    const component = shallow(<Sidebar />)
    expect(component.exists()).toBe(true)
  })
})
