import React from 'react'
import ReactDOM from 'react-dom'
import { LoginForm } from './LoginForm'
import * as constants from './LoginForm'
import EmailLogin from './EmailLogin'
import UportLogin from './UportLogin'

const defaultProps = {
  usersExist: true,
  getUsersExist: () => {},
  createAdmin: () => {},
  login: () => {},
}

describe('LoginForm', () => {
  it('should call a function to see if any users exist', () => {
    const mockUsersExist = jest.fn()
    const component = shallow(
      <LoginForm {...defaultProps} getUsersExist={mockUsersExist} />
    )
    expect(mockUsersExist.mock.calls.length).toBe(1)
  })

  describe('Email Login', () => {
    it('should render when useUport is false', () => {
      const component = shallow(<LoginForm {...defaultProps} />)
      component.setState({ useUport: false })
      expect(component.find(EmailLogin).length).toEqual(1)
      expect(component.find(UportLogin).length).toEqual(0)
    })

    it('should display "login" if users exist or "create admin" if they don\'t', () => {
      const component = shallow(
        <LoginForm {...defaultProps} usersExist={false} />
      )

      const expectTextToMatch = expectedText => {
        expect(component.find(EmailLogin).props().submitText).toBe(expectedText)
        expect(component.state().submitText).toBe(expectedText)
      }

      expectTextToMatch(constants.SUBMIT_CREATE)
      component.setProps({ usersExist: true })
      expectTextToMatch(constants.SUBMIT_LOGIN)
      component.setProps({ usersExist: false })
      expectTextToMatch(constants.SUBMIT_CREATE)
    })

    it("should call create an admin on submit if users don't exist", () => {
      const mockCreateAdmin = jest.fn()
      const component = shallow(
        <LoginForm
          {...defaultProps}
          usersExist={false}
          createAdmin={mockCreateAdmin}
        />
      )
      expect(component.find(EmailLogin).props().onSubmit).toBe(mockCreateAdmin)
    })

    it('should call login on submit if users exist', () => {
      const mockLogin = jest.fn()
      const component = shallow(
        <LoginForm {...defaultProps} usersExist={true} login={mockLogin} />
      )
      expect(component.find(EmailLogin).props().onSubmit).toBe(mockLogin)
    })
  })

  describe('Uport Login', () => {
    it('should render when useUport is true', () => {
      const component = shallow(<LoginForm {...defaultProps} />)
      component.setState({ useUport: true })
      expect(component.exists()).toEqual(true)
      expect(component.find(UportLogin).length).toEqual(1)
      expect(component.find(EmailLogin).length).toEqual(0)
    })
  })

  describe('Toggle login mode button', () => {
    it('should toggle useUport when clicked', () => {
      const component = shallow(<LoginForm {...defaultProps} />)
      const toggleButton = component.find('[data-test-id="toggleLoginMode"]')
      expect(toggleButton.length).toEqual(1)
      const useUport = component.state().useUport
      toggleButton.simulate('click')
      expect(component.state().useUport).toEqual(!useUport)
    })

    it('should display "login with uport" and "login with email" if users exist', () => {
      const component = shallow(
        <LoginForm {...defaultProps} usersExist={true} />
      )
      expect(component.state().toggleText).toBe(constants.TOGGLE_LOGIN_UPORT)
      component.find('[data-test-id="toggleLoginMode"]').simulate('click')
      expect(component.state().toggleText).toBe(constants.TOGGLE_LOGIN_EMAIL)
    })

    it('should display "create with uport" and "create with email" if users don\'t exist', () => {
      const component = shallow(
        <LoginForm {...defaultProps} usersExist={false} />
      )
      expect(component.state().toggleText).toBe(constants.TOGGLE_CREATE_UPORT)
      component.find('[data-test-id="toggleLoginMode"]').simulate('click')
      expect(component.state().toggleText).toBe(constants.TOGGLE_CREATE_EMAIL)
    })
  })
})
