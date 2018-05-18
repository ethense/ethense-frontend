import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import App from './App'
import LoginForm from '../LoginForm'
import IssueCert from '../IssueCert'
import ManageAppIds from '../ManageAppIds'
import ManageUsers from '../ManageUsers'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('App', () => {
  let store

  it('should render without crashing', () => {
    const component = shallow(<App />)
    expect(component.exists()).toEqual(true)
  })

  describe('user logged in', () => {
    beforeEach(() => {
      store = mockStore({
        authentication: {
          usersExist: true,
          loggedIn: true,
        },
        notification: {
          open: false,
          message: null,
        },
      })
    })

    it('should redirect login route to issue cert', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[LoginForm.route]} initialIndex={0}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(component.find(IssueCert).length).toBe(1)
    })

    it('should render issue cert page at its route when logged in', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[IssueCert.route]} initialIndex={0}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(component.find(IssueCert).length).toBe(1)
    })

    it('should render manage app ids page at its route when logged in', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ManageAppIds.route]} initialIndex={0}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(component.find(ManageAppIds).length).toBe(1)
    })

    it('should render manage users page at its route when logged in', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ManageUsers.route]} initialIndex={0}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(component.find(ManageUsers).length).toBe(1)
    })
  })

  describe('user not logged in', () => {
    beforeEach(() => {
      store = mockStore({
        authentication: {
          usersExist: true,
          loggedIn: false,
        },
        notification: {
          open: false,
          message: null,
        },
      })
    })

    it('should render a login form at the login route', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[LoginForm.route]} initialIndex={0}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(component.find(LoginForm).length).toBe(1)
    })

    it('should redirect issue cert route to login', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[IssueCert.route]} initialIndex={0}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(component.find(LoginForm).length).toBe(1)
    })

    it('should redirect manage app ids route to login', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ManageAppIds.route]} initialIndex={0}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(component.find(LoginForm).length).toBe(1)
    })

    it('should redirect manage users route to login', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ManageUsers.route]} initialIndex={0}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(component.find(LoginForm).length).toBe(1)
    })
  })
})
