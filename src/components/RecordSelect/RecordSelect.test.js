import React from 'react'
import RecordSelect from './RecordSelect'

const defaultProps = {
  emptyValue: '',
  selectValue: '',
  onChangeValue: () => {},
  onClickCreate: () => {},
  onClickSave: () => {},
  onClickDelete: () => {},
}

const getShallowComponent = props =>
  shallow(<RecordSelect {...defaultProps} {...props} />)

describe('Record selection component', () => {
  it('should render', () => {
    const component = getShallowComponent()
    expect(component.exists()).toBe(true)
  })

  describe('select menu', () => {
    it('should have an empty value selected when the component mounts', () => {})
    it('should display emptyValue when an empty value is selected', () => {})
    it('should call onChangeValue when the value is changed', () => {})
    it('should render a menu item for each object in selectItems', () => {})
    describe('menu item', () => {
      it('should have a value equal to the id of the item', () => {})
      it('should contain text equal to the name of the item', () => {})
    })
  })

  describe('delete button', () => {
    it('should be disabled when no record is selected', () => {})
    it('should be enabled when a record is selected', () => {})
    it('should call onClickDelete when clicked', () => {})
  })

  describe('save button', () => {
    it('should be disabled when no record is selected', () => {})
    it('should be enabled when a record is selected', () => {})
    it('should call onClickSave when clicked', () => {})
  })

  describe('create button', () => {
    it('should call onClickCreate when clicked', () => {})
  })
})
