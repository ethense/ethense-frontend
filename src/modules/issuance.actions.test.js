import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import expect from 'expect'

import * as issuanceActions from './issuance'
import * as notificationActions from './notification'
import { api } from '../services/NetworkService'
import { PICKUP_EMAIL_SENT, PICKUP_EMAIL_ERROR } from '../constants/messages'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

beforeEach(() => {
  moxios.install(api)
})

afterEach(() => {
  moxios.uninstall()
})

describe('issuance actions', () => {
  it('dispatches ISSUANCE_SUCCESS on success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: {
          success: true,
        },
      })
    })

    const expectedActions = [
      { type: issuanceActions.ISSUE_REQUEST },
      {
        type: issuanceActions.ISSUE_SUCCESS,
        payload: {
          success: true,
        },
      },
      {
        type: notificationActions.SHOW_NOTIFICATION,
        payload: PICKUP_EMAIL_SENT('email'),
      },
    ]

    const store = mockStore()

    await store.dispatch(issuanceActions.issue('appId', 'email', []))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches ISSUE_FAILURE on failure', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 500,
        response: { error: 'server error' },
      })
    })

    const expectedActions = [
      { type: issuanceActions.ISSUE_REQUEST },
      {
        type: issuanceActions.ISSUE_FAILURE,
        payload: new Error('Request failed with status code 500'),
      },
      {
        type: notificationActions.SHOW_NOTIFICATION,
        payload: PICKUP_EMAIL_ERROR,
      },
    ]

    const store = mockStore()

    await store.dispatch(issuanceActions.issue('appId', 'email', []))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
