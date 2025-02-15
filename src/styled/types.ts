import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
export type Theme = {
  textColors: {
    primary: string
    secondary: string
  }
  backgroundColors: {
    primary: string
    secondary: string
    card: string
    button: string
    buttonHover: string
  }
  fontSizes: {
    small: string
    medium: string
    large: string
    xlarge: string
  }
}
