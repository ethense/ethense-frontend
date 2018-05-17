import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import App from './App'
import LoginForm from '../LoginForm'
import IssueCert from '../IssueCert'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('App', () => {
  it('should render without crashing', () => {
    const component = shallow(<App />)
    expect(component.exists()).toEqual(true)
  })

  describe('base route', () => {
    it('should render a login form at the base route', () => {
      const store = mockStore({
        authentication: {
          usersExist: true,
          loggedIn: false,
        },
      })
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(component.find(LoginForm).length).toBe(1)
    })
  })

  describe('/issue', () => {
    // it('should check for user authentication', () => {})
  })
})
