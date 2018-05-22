import React, { Component } from 'react'
import styled from 'styled-components'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { withTheme } from '@material-ui/core/styles'

const SmallIconButton = withTheme()(styled(IconButton)`
  width: ${props => props.theme.spacing.medium};
  height: ${props => props.theme.spacing.medium};
`)

const DragHandle = withTheme()(styled.div`
  height: 100%;
  cursor: move;
  z-index: 1;
  color: ${props => props.theme.palette.grey['400']};
  text-align: center;
  padding-top: ${props => props.theme.spacing.small};
  align-self: stretch;
`)

const Container = withTheme()(styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${props =>
    props.dropZone
      ? props.dropZone === 'invalid'
        ? props.theme.palette.error.light
        : props.theme.palette.primary.light
      : props.theme.palette.background.paper};
  border-bottom: 1px solid ${props => props.theme.palette.divider};
  padding-left: 16px;

  opacity: ${props => (props.isDraggedDescendant ? 0.5 : 1)};

  > * {
    margin-right: ${props => props.theme.spacing.small};
    opacity: ${props => (props.dropZone ? 0 : 1)};
  }
`)

const FixedSpacing = withTheme()(styled.div`
  width: ${props => props.theme.spacing.medium};
`)

const isDescendant = (older, younger) =>
  !!older.children &&
  typeof older.children !== 'function' &&
  older.children.some(
    child => child === younger || isDescendant(child, younger)
  )

class ClaimNodeContentRenderer extends Component {
  render() {
    const {
      buttons,
      canDrop,
      connectDragPreview,
      connectDragSource,
      didDrop,
      draggedNode,
      isDragging,
      node,
      path,
      subtitle,
      title,
      toggleChildrenVisibility,
      treeIndex,
      ...other
    } = this.props

    const nodeTitle = title || node.title
    const handle = (
      <DragHandle
        innerRef={instance =>
          connectDragSource(instance, { dropEffect: 'move' })
        }
      >
        <Icon>drag_indicator</Icon>
      </DragHandle>
    )

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node)
    let dropZone = null
    if (!didDrop && isDragging) {
      dropZone = canDrop ? 'valid' : 'invalid'
    }

    return (
      <Container
        innerRef={instance => connectDragPreview(instance)}
        key={treeIndex}
        dropZone={dropZone}
        isDraggedDescendant={isDraggedDescendant}
        {...other}
      >
        {node.type === 'object' ? (
          <SmallIconButton
            disabled={!node.children || !node.children.length}
            onClick={() => toggleChildrenVisibility({ node, path, treeIndex })}
          >
            <Icon>{node.expanded ? 'arrow_drop_down' : 'arrow_right'}</Icon>
          </SmallIconButton>
        ) : (
          <FixedSpacing />
        )}
        {handle}
        {typeof nodeTitle === 'function'
          ? nodeTitle({ node, path, treeIndex })
          : nodeTitle}
        {buttons}
      </Container>
    )
  }
}

export default ClaimNodeContentRenderer
