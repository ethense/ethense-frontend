import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

export const Container = withTheme()(styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 100vh;
  background: ${props => props.theme.palette.primary.dark};
  /* background: white; */
  padding: ${props => props.theme.spacing.medium};
`)

export const NavButton = withTheme()(
  withRouter(
    styled(({ children, to, history, ...other }) => (
      <Button
        {...other}
        onClick={() => history.push(to)}
        classes={{ label: 'label' }}
        disableRipple
      >
        {children}
      </Button>
    ))`
      margin-bottom: ${props => props.theme.spacing.tiny};
      color: ${props =>
        props.history.location.pathname === props.to
          ? props.theme.palette.grey['50']
          : props.theme.palette.grey['300']};
      background: ${props =>
        props.history.location.pathname === props.to
          ? props.theme.palette.action.disabled
          : null};

      &:hover {
        background: ${props =>
          props.history.location.pathname === props.to
            ? props.theme.palette.action.disabled
            : props.theme.palette.action.hover};
      }

      & .label {
        justify-content: flex-start;
        text-transform: none;
      }

      & .label span {
        margin-right: ${props => props.theme.spacing.small};
      }
    `
  )
)

export const FlexSpace = styled.div`
  flex: 1;
`

export const UserButton = withTheme()(styled(({ children, ...other }) => (
  <IconButton disableRipple {...other} classes={{ label: 'label' }}>
    {children}
  </IconButton>
))`
  color: ${props => props.theme.palette.grey['300']};
`)
