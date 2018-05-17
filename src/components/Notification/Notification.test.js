import React from 'react'
import Notification from './Notification'

describe('Notification', () =>  {
  it('should render', () => {
    const component = shallow(<Notification />)
    expect(component.exists()).toBe(true)
  })
})
