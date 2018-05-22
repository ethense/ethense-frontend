import React, { Component, Children, cloneElement } from 'react'
import styled from 'styled-components'

const NodeDiv = styled.div`
  color: none;
  position: relative;
  padding-left: ${props => props.scaffoldSize}px;
  height: 56px;
`

class ClaimTreeNodeRenderer extends Component {
  render() {
    const {
      canDrop,
      children,
      connectDropTarget,
      draggedNode,
      getPrevRow,
      isOver,
      listIndex,
      lowerSiblingCounts,
      scaffoldBlockPxWidth,
      swapDepth,
      swapFrom,
      swapLength,
      treeId,
      treeIndex,
      ...other,
    } = this.props

    const scaffoldBlockCount = lowerSiblingCounts.length - 1
    const scaffoldSize = scaffoldBlockCount * scaffoldBlockPxWidth

    return (
      <NodeDiv innerRef={instance => connectDropTarget(instance)} scaffoldSize={scaffoldSize} {...other}>
        {Children.map(children, child =>
          cloneElement(child, {
            canDrop,
            draggedNode,
            isOver,
          })
        )}
      </NodeDiv>
    )
  }
}

export default ClaimTreeNodeRenderer
