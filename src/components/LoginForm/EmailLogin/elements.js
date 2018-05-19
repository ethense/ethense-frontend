import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withTheme } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import styled from 'styled-components'

export const StyledTextField = withTheme()(styled(({ endIcon, ...other }) => (
  <TextField
    {...other}
    InputProps={{
      endAdornment: <Icon color="disabled">{endIcon}</Icon>,
    }}
  />
))`
  &:first-of-type {
    margin-top: ${props => props.theme.spacing.medium};
    margin-bottom: ${props => props.theme.spacing.small};
  }

  &:not(:first-of-type) {
    margin-bottom: ${props => props.theme.spacing.large};
  }
`)

export const FlexSpace = withTheme()(styled.div`
  flex: 1;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    border-top: 1px solid ${props => props.theme.palette.grey['200']};
    background: block;
    width: 100%;
  }
`)
