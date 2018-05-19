import React from 'react'
import { IssueCert } from './IssueCert'

const defaultProps = {
  getAppIds: () => {},
  addAppId: () => {},
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

  describe('add app id button', () => {
    it('should render if there are no app ids', () => {
      const component = shallow(<IssueCert {...defaultProps} appIds={[]} />)
      expect(component.instance().props.appIds).toEqual([])
      expect(component.find('[data-test-id="addAppIdBtn"]').length).toBe(1)
    })

    it('should open the add app id form when clicked', () => {
      const mockAddAppId = jest.fn()
      const component = shallow(
        <IssueCert {...defaultProps} appIds={[]} addAppId={mockAddAppId} />
      )
      const addAppIdBtn = component.find('[data-test-id="addAppIdBtn"]')
      addAppIdBtn.simulate('click')
      expect(component.instance().state.addAppIdOpen).toBe(true)
    })
  })
})
