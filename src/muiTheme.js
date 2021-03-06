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
    // primary: {
    //   light: '#768fff',
    //   main: '#2962ff',
    //   dark: '#0039cb',
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   light: '#ff5bff',
    //   main: '#d500f9',
    //   dark: '#9e00c5',
    //   contrastText: '#fff',
    // },
    primary: {
      light: '#5C6BC0',
      main: '#3949AB',
      dark: '#1A237E',
      contrastText: '#fff',
    },
    secondary: {
      light: '#F1BDFC',
      main: '#DE56FB',
      dark: '#8500EA',
      contrastText: '#fff',
    },
  },
  // TODO: figure out why overrides.MuiInput.underline['&:before'].content doesn't work
})

export default muiTheme
