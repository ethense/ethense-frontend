import reducer, * as actions from './issuance'
import expect from 'expect'

describe('issuance reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      reading: false,
      error: null,
    })
  })

  it('should handle ISSUE_REQUEST', () => {
    expect(reducer(undefined, { type: actions.ISSUE_REQUEST })).toEqual({
      reading: true,
      error: null,
    })
  })

  it('should handle ISSUE_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: actions.ISSUE_SUCCESS,
        payload: { success: true },
      })
    ).toEqual({
      reading: false,
      error: null,
    })
  })

  it('should handle ISSUE_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: actions.ISSUE_FAILURE,
        payload: new Error('server error'),
      })
    ).toEqual({
      reading: false,
      error: new Error('server error'),
    })
  })
})
