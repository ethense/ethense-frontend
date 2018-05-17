import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'
import * as authenticationActions from './authentication'
import * as notificationActions from './notification'
import { api } from '../services/NetworkService'
import { INVALID_LOGIN_CREDENTIALS } from '../constants/messages'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const VALID_EMAIL = 'user@example.com'
const VALID_PASSWORD = 'KJ8WF5u2jf'
const USER_ID = '5afb79b86da9626fa365da99'
const ACCESS_TOKEN =
  'Xi8ND0nYpsCC9Jr92gP7sJgq2zkBfBsC22zHdsuDhPgmtKjuvhZSpLTpzdNCNx2a'

beforeEach(() => {
  moxios.install(api)
})

afterEach(() => {
  moxios.uninstall()
})

describe('getUsersExist actions', () => {
  it('dispatches USERS_EXIST_SUCCESS on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: { usersExist: false },
      })
    })

    const expectedActions = [
      { type: authenticationActions.USERS_EXIST_REQUEST },
      {
        type: authenticationActions.USERS_EXIST_SUCCESS,
        payload: { usersExist: false },
      },
    ]

    const store = mockStore()

    await store.dispatch(authenticationActions.getUsersExist())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches USERS_EXIST_FAILURE on failure', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 500,
        response: { error: 'server error' },
      })
    })

    const expectedActions = [
      { type: authenticationActions.USERS_EXIST_REQUEST },
      {
        type: authenticationActions.USERS_EXIST_FAILURE,
        payload: new Error('Request failed with status code 500'),
      },
    ]

    const store = mockStore()

    await store.dispatch(authenticationActions.getUsersExist())
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('createAdmin actions', () => {
  it('dispatches CREATE_ADMIN_SUCCESS LOGIN_REQUEST on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          email: VALID_EMAIL,
          id: USER_ID,
        },
      })
    })

    const expectedActions = [
      { type: authenticationActions.CREATE_ADMIN_REQUEST },
      { type: authenticationActions.CREATE_ADMIN_SUCCESS },
      { type: authenticationActions.LOGIN_REQUEST },
    ]

    const store = mockStore()

    await store.dispatch(
      authenticationActions.createAdmin({
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      })
    )
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches CREATE_ADMIN_FAILURE on failure', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 500,
        response: { error: 'server error' },
      })
    })

    const expectedActions = [
      { type: authenticationActions.CREATE_ADMIN_REQUEST },
      {
        type: authenticationActions.CREATE_ADMIN_FAILURE,
        payload: new Error('Request failed with status code 500'),
      },
    ]

    const store = mockStore()

    await store.dispatch(
      authenticationActions.createAdmin({
        email: 'bad email',
        password: 'password',
      })
    )
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('login actions', () => {
  it('dispatches LOGIN_SUCCESS on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          id: ACCESS_TOKEN,
          ttl: 1209600,
          created: '2018-05-17T06:42:14.812Z',
          userId: USER_ID,
        },
      })
    })

    const expectedActions = [
      { type: authenticationActions.LOGIN_REQUEST },
      {
        type: authenticationActions.LOGIN_SUCCESS,
        payload: {
          id: ACCESS_TOKEN,
          ttl: 1209600,
          created: '2018-05-17T06:42:14.812Z',
          userId: USER_ID,
        },
      },
    ]

    const store = mockStore()

    await store.dispatch(
      authenticationActions.login(VALID_EMAIL, VALID_PASSWORD)
    )
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches LOGIN_FAILURE on failure', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 401,
        response: { error: 'server error' },
      })
    })

    const expectedActions = [
      { type: authenticationActions.LOGIN_REQUEST },
      {
        type: authenticationActions.LOGIN_FAILURE,
        payload: new Error('Request failed with status code 401'),
      },
      {
        type: notificationActions.SHOW_NOTIFICATION,
        payload: INVALID_LOGIN_CREDENTIALS,
      },
    ]

    const store = mockStore()

    await store.dispatch(authenticationActions.login('email', 'password'))
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('logout actions', () => {
  it('dispatches LOGOUT_SUCCESS on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 204,
      })
    })

    const expectedActions = [
      { type: authenticationActions.LOGOUT_REQUEST },
      { type: authenticationActions.LOGOUT_SUCCESS },
    ]

    const store = mockStore()

    await store.dispatch(authenticationActions.logout())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches LOGOUT_FAILURE on failure', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 500,
        response: { error: 'server error' },
      })
    })

    const expectedActions = [
      { type: authenticationActions.LOGOUT_REQUEST },
      {
        type: authenticationActions.LOGOUT_FAILURE,
        payload: new Error('Request failed with status code 500'),
      },
    ]

    const store = mockStore()

    await store.dispatch(authenticationActions.logout())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
