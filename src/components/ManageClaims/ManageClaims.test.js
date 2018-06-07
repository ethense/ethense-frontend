import React from 'react'
import { ManageClaims } from './ManageClaims'

const defaultProps = {}

const getShallowComponent = props =>
  shallow(<ManageClaims {...defaultProps} {...props} />)

describe('Manage Claims page', () => {
  it('should render', () => {
    const component = getShallowComponent()
    expect(component.exists()).toBe(true)
  })

  it('should call getClaimTemplates when mounting', () => {})
  it('should have a RecordSelect component that manages claim templates', () => {
    // test for presence of a <RecordSelect> component
    // test that the props are hooked up to the correct attributes and methods
    // Is this test too specific to the implementation?  If so, what would be a
    // good way to test if there are UI controls that affect the state (esp if
    // they are passed through a child component)?
  })

  it('should have a SortableTree component that manages claim attributes', () => {
    // test for presence of a <SortableTree> component
    // test that treeData prop is set to selectedClaim.schema
    // test that onChange prop is set to handleClaimChange
    // test that generateNodeProps prop is set to getAttributeNode
    // test that canDrop prop is set to isObjectType
  })

  describe('getAttributeNode', () => {
    it('should return an object with an array of component', () => {})
    describe('attribute name field', () => {
      it('should have a value equal to the attribute', () => {})
      it('should call handleChangeAttributeName when the value changes', () => {})
    })
    describe('attribute value field', () => {
      it('should be a text field when the attribute type is static', () => {})
      it('should have a value equal to the attribute value when the type is static', () => {})
      it('should call handleChangeAttributeValue when the value changes', () => {})
      it('should be a text field when the attribute type is dynamic', () => {})
      it('should have a value equal to the attribute value when the type is dynamic', () => {})
      it('should contain text with the number of children the attribute type is group', () => {})
    })
    describe('add child attribute button', () => {
      it('should not render if the attribute type is not object', () => {})
      it('should render if the attribute type is object', () => {})
      it('should call handleAddChildAttribute when clicked', () => {})
    })
    describe('delete attribute button', () => {
      it('should call handleDeleteAttribute when clicked', () => {})
    })
    describe('attribute type select', () => {
      it('should have values for static, dynamic, and group', () => {})
      it('should call handleChangeAttributeType when the value is changed', () => {})
    })
  })

  describe('handleChangeAttributeName', () => {
    it('should call changeAttribute with name')
  })

  describe('handleChangeAttributeValue', () => {
    it('should call changeAttribute with value')
  })

  describe('changeAttribute', () => {
    it('should pass an object with the new attribute to changeNodeAtPath', () => {})
    it('should set selectedClaim.schema to the output of changeNodeAtPath', () => {})
  })

  describe('handleAddChildAttribute', () => {
    it('should pass the output of getNewNode to addNodeUnderParent', () => {})
    it('should set selectedClaim.schema to the output of addNodeUnderParent', () => {})
  })

  describe('handleDeleteAttribute', () => {
    it('should call removeNodeAPath', () => {})
    it('should set selectedClaim.schema to the output of removeNodeAtPath', () => {})
  })

  describe('handleChangeAttributeType', () => {
    it('should pass an object with the new type to changeNodeAtPath', () => {})
    it('should set selectedClaim.schema to the output of changeNodeAtPath', () => {})
  })

  describe('isObjectType', () => {
    it('should return true for a parent that is null', () => {})
    it('should return true for a parent with type attribute equal to "object"', () => {})
    it('should return false for a parent with type attribute not equal to "object"', () => {})
    it('should return false for a parent without a type attribute', () => {})
  })

  describe('add attribute button', () => {
    it('should render', () => {})
    it('should call handleAddClaimAttribute', () => {})
  })

  describe('handleAddClaimAttribute', () => {
    it('should add a new attribute object to the end of the selectedClaim.schema', () => {})
  })

  describe('handleChangeClaim', () => {
    it('should set selectedClaim to the id of the selected claim', () => {})
  })

  describe('handleDeleteClaim', () => {
    it('should set selectedClaim to null', () => {})
    it('should call deleteClaimTemplate', () => {})
  })

  describe('handleSaveClaim', () => {
    it('should call saveClaimTemplate', () => {})
  })

  describe('handleOpenClaimDialog', () => {
    it('should open the claim name dialog', () => {})
  })

  describe('handleCreateClaim', () => {
    it('should call createClaimTemplate', () => {})
    it('should close the claim name dialog', () => {})
  })
})
