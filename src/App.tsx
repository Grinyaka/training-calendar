import {BrowserRouter, Route, Routes} from 'react-router'
import MainPage from './pages/main'
import ActivitiesPage from './pages/activities'
import DatePage from './pages/main/date'
import { ThemeProvider } from 'styled-components'
import { MainTheme } from './styled/Theme'
import Menu from './components/Menu'

function App() {
  return (
    <ThemeProvider theme={MainTheme}>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:date" element={<DatePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
