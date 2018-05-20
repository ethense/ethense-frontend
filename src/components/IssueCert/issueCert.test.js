import React from 'react'
import { IssueCert } from './IssueCert'

const defaultProps = {
  getAppIds: () => {},
  addAppId: () => {},
  appIds: [],
}

const APP_ID = {
  id: 1,
  name: 'app name',
  mnid: '1234',
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
      expect(component.find('[data-test-id="addAppIdBtn"]').length).toBe(1)
    })

    it('should not render if there are app ids', () => {
      const component = shallow(
        <IssueCert {...defaultProps} appIds={[APP_ID]} />
      )
      expect(component.find('[data-test-id="addAppIdBtn"]').length).toBe(0)
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

  describe('app id selector', () => {
    it('should render if there are app ids', () => {
      const component = shallow(
        <IssueCert {...defaultProps} appIds={[APP_ID]} />
      )
      expect(component.find('[data-test-id="appIdSelect"]').length).toBe(1)
    })

    it('should not render if there are no app ids', () => {
      const component = shallow(<IssueCert {...defaultProps} appIds={[]} />)
      expect(component.find('[data-test-id="appIdSelect"]').length).toBe(0)
    })
  })

  it('should render a recipient email input', () => {
      const component = shallow(<IssueCert {...defaultProps} appIds={[]} />)
      expect(component.find('[data-test-id="recipientEmail"]').length).toBe(1)
  })
})
