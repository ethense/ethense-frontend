import React from 'react'
import { IssueCert } from './IssueCert'

const defaultProps = {
  getAppIds: () => {},
  appIds: [],
}
describe('Issue Certificate page', () => {
  it('should have a primary action button', () => {
    const component = shallow(<IssueCert {...defaultProps} />)
    expect(component.find('[data-test-id="issueBtn"]').exists()).toBe(true)
  })

  it('should call a function to get app iddentities', () => {
    const mockGetAppIds = jest.fn()
    const component = shallow(
      <IssueCert {...defaultProps} getAppIds={mockGetAppIds} />
    )
    expect(mockGetAppIds.mock.calls.length).toBe(1)
  })
})
