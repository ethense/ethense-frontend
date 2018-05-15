import React from 'react'
import { withTheme } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import { InputAdornment } from 'material-ui/Input'
import Icon from 'material-ui/Icon'
import styled from 'styled-components'

const StyledTextField = withTheme()(styled(({ endIcon, ...other }) => (
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

const StyledPaper = withTheme()(styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: ${props => props.theme.spacing.medium};
`)

const LoginForm = () => (
  <StyledPaper data-test-id="loginForm" elevation={1}>
    <StyledTextField
      fullWidth
      data-test-id="emailInput"
      label="Email"
      endIcon="email"
    />
    <StyledTextField
      fullWidth
      data-test-id="passwordInput"
      type="password"
      label="Password"
      endIcon="lock"
    />
  </StyledPaper>
)

export default LoginForm
