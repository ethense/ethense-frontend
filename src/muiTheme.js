import { createMuiTheme } from '@material-ui/core/styles'

const muiTheme = createMuiTheme({
  spacing: {
    tiny: '8px',
    small: '16px',
    medium: '24px',
    large: '48px',
    huge: '64px',
  },
  palette: {
    primary: {
      light: '#768fff',
      main: '#2962ff',
      dark: '#0039cb',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff5bff',
      main: '#d500f9',
      dark: '#9e00c5',
      contrastText: '#fff',
    },
  },
})

export default muiTheme
