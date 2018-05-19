import React from 'react'
import { ManageAppIds } from './ManageAppIds'

describe('Manage App Ids page', () => {
  it('should have a primary action button', () => {
    const component = shallow(<ManageAppIds />)
    expect(component.find('[data-test-id="addAppIdBtn"]').exists()).toBe(true)
  })
})
