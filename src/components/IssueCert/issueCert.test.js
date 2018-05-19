import React from 'react'
import { IssueCert } from './IssueCert'

describe('Issue Certificate page', () => {
  it('should have a primary action button', () => {
    const component = shallow(<IssueCert/>)
    expect(component.find('[data-test-id="issueBtn"]').exists()).toBe(true)
  })
})
