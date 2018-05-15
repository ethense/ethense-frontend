import React from 'react'
import { withTheme } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { InputAdornment } from 'material-ui/Input'
import Icon from 'material-ui/Icon'
import styled from 'styled-components'

export const StyledPaper = withTheme()(styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 420px;
  padding: ${props => props.theme.spacing.medium};
`)

export const StyledTextField = withTheme()(styled(({ endIcon, ...other }) => (
  <TextField
    {...other}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <Icon color="disabled">{endIcon}</Icon>
        </InputAdornment>
      ),
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

export const StyledButton = withTheme()(styled(props => (
  <Button {...props} />
))`
  background-image: linear-gradient(
    45deg,
    ${props => !props.disabled && props.theme.palette.primary.main} 10%,
    ${props => !props.disabled && props.theme.palette.secondary.main} 90%
  );

  color: ${props => !props.disabled && props.theme.palette.grey['50']};

  &:hover {
    background-image: linear-gradient(
      45deg,
      ${props => !props.disabled && props.theme.palette.primary.dark} 10%,
      ${props => !props.disabled && props.theme.palette.secondary.dark} 90%
    );
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