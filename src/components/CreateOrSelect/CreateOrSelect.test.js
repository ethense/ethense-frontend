import React from 'react'
import CreateOrSelect from './CreateOrSelect'

const defaultProps = {
  emptyNode: <div key={0}></div>,
  emptyValue: '',
  selectValue: '',
  buttonText: 'create',
  onChangeItem: () => {},
  onCreateItem: () => {},
}

const getShallowComponent = props =>
  shallow(<CreateOrSelect {...defaultProps} {...props} />)

describe('Record selection component', () => {
  it('should render', () => {
    const component = getShallowComponent()
    expect(component.exists()).toBe(true)
  })

  describe('when selectItems is empty', () => {
    it('should display a button to create a new model', () => {})
    it('should call onCreateItem when the button is clicked', () => {})
    it('should render the contents of emptyNode', () => {})
  })

  describe('when selectItems is not empty', () => {
    it('should display a select menu', () => {})
    it('should call onChangeItem when the select is changed', () => {})
  })

})
